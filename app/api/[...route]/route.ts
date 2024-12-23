import { Liveblocks } from "@liveblocks/node";
import { and, desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'

import { db } from '@/lib/db/drizzle'
import { board, favorite } from '@/lib/db/schemas'
import { getBoard } from "@/lib/action";


// export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/', async (c) => {
  // create the board
  return c.json({ message: 'Board created' })
})



app.post('/board', async (c) => {
  try {
    const body = await c.req.json();
    const { authorId,
      authorName,
      orgId,
      title } = body
    // creating the board 
    const [createdBoard] = await db.insert(board).values({
      authorId,
      authorName,
      orgId,
      title,
    }).returning({ id: board.id })
    return NextResponse.json({ data: createdBoard, message: 'Board created' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}).delete('/board/:id', async (c) => {
  try {
    const id = c.req.param('id')

    // Also the delete favorite relations
    await db.delete(favorite).where(eq(favorite.boardId, id)).returning({ id: favorite.id })

    const [deletedBoard] = await db.delete(board).where(eq(board.id, id)).returning({ id: board.id })

    if (!deletedBoard) {
      return NextResponse.json({ message: 'Board not found' }, { status: 404 })
    }

    return NextResponse.json({ data: deletedBoard, message: 'Board deleted' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}).put('/board/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json();
    const { title } = body;
    const updatedBoard = await db.update(board).set({ title }).where(eq(board.id, id)).returning({ id: board.id })
    return NextResponse.json({ data: updatedBoard, message: 'Board updated' }, { status: 200 })
  } catch (error) {
    console.error(error)
  }
})



// Get all boards by organization id
app.get('/board/:orgId', async (c) => {
  // create the board
  try {
    const orgId = c.req.param('orgId')
    const search = c.req.query('search')
    const favorite = c.req.query('favorite')
    const { userId } = await auth();
    let boards = []
    if (search && search.length > 0 && search !== 'undefined') {
      boards = await db.query.board.findMany({
        where: and(eq(board.title, search), eq(board.orgId, orgId)),
        orderBy: [desc(board.createdAt)],
        with: { favorites: true }
      })
    } else {
      boards = await db.query.board.findMany({
        where: eq(board.orgId, orgId),
        orderBy: [desc(board.createdAt)],
        with: { favorites: true }
      })

    }

    let newBoards = [];
    // add isFavorite field to true if userId match to current user otherwise false 
    if (favorite && favorite === 'true') {
      newBoards = boards
        .filter((board) => board.favorites.some((fav) => fav.userId === 'user_2p3i8AaNAB7gxsSgufHQ1wLcH4w'))
        .map((board) => ({ ...board, isFavorite: true }));


    } else {

      newBoards = boards.map((board) => {
        // Check if the board has any favorite matching the userId
        const isFavorite = board.favorites.some((favorite) => favorite.userId === userId);
        // Return the updated board object with the isFavorite flag
        return { ...board, isFavorite };
      });
    }



    return NextResponse.json({ data: newBoards, message: 'Boards fetched' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
})

app.post('/board/favorite/:id', async (c) => {
  try {
    const { userId, boardId, orgId } = await c.req.json()

    const [existingFavorite] = await db.select().from(favorite).where(and(eq(favorite.userId, userId), eq(favorite.boardId, boardId), eq(favorite.orgId, orgId)))

    if (existingFavorite) {
      throw Error('Favorite already exists')
    }

    const [createdFavorite] = await db.insert(favorite).values({
      userId,
      boardId,
      orgId,
    }).returning({ id: favorite.id })

    return NextResponse.json({ data: createdFavorite, message: 'Board favorited' }, { status: 200 })
  } catch (error) {
    console.error(error)
    throw Error('Something went wrong')

  }
})


app.post('/board/unfavorite/:id', async (c) => {
  try {
    const { userId, boardId, orgId } = await c.req.json()

    const [existingFavorite] = await db.select().from(favorite).where(and(eq(favorite.userId, userId), eq(favorite.boardId, boardId), eq(favorite.orgId, orgId)))

    if (!existingFavorite) {
      throw Error('Favorite does not exist')
    }
    const [deletedFavorite] = await db.delete(favorite).where(and(eq(favorite.userId, userId), eq(favorite.boardId, boardId), eq(favorite.orgId, orgId))).returning({ id: favorite.id })

    return NextResponse.json({ data: deletedFavorite, message: 'Board unfavorited' }, { status: 200 })
  } catch (error) {
    console.error(error)
  }
})




const liveblocks = new Liveblocks({
  secret: "sk_prod_ZCNkX5Zo9UM0VUXecJfpudTFhKI2p28SzT0-X7HNfPW2jrobLXmk_sEP2GlKBKdh",
});

app.post('/liveblocks-auth', async (c) => {

  const authorization = await auth();
  const user = await currentUser();


  if (!user || !authorization) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  const { room } = await c.req.json();

  const singleBoard = await getBoard(room)

  if (!singleBoard || singleBoard.orgId !== authorization.orgId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
  }

  

  const userInfo = {
    name: user.firstName || 'Teammate',
    picture: user.imageUrl
  }

  const session = liveblocks.prepareSession(
    user.id,
    { userInfo },
  );


  if (room) {
    session.allow(room, session.FULL_ACCESS)
  }

  const { status, body } = await session.authorize();
  return new Response(body, { status })

})



const handler = handle(app)
export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
