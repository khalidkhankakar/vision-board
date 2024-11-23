import { db } from '@/lib/db/drizzle'
import { board } from '@/lib/db/schemas'
import { desc, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { NextResponse } from 'next/server'

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
    }).returning({id:board.id})
    return NextResponse.json({ data: createdBoard, message: 'Board created' },{status:201})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, {status:500})
  }
}).delete('/board/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const deletedBoard = await db.delete(board).where(eq(board.id, id)).returning({id:board.id})
    return NextResponse.json({ data: deletedBoard, message: 'Board deleted' },{status:200})
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error' }, {status:500})
  }
}).put('/board/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json();
    const { title } = body;
    const updatedBoard = await db.update(board).set({title}).where(eq(board.id, id)).returning({id:board.id})
    return NextResponse.json({ data: updatedBoard, message: 'Board updated' },{status:200})
  } catch (error) {
    console.error(error)
  }
})



// Get all boards by organization id
app.get('/board/:orgId', async (c) => {
  // create the board
  try {
  const orgId = c.req.param('orgId')
  const boards = await db.select().from(board).where(eq(board.orgId, orgId)).orderBy(desc(board.createdAt))
  return NextResponse.json({ data:boards, message: 'Boards fetched' },{status:200})
} catch (error) {
  console.error(error)
  return NextResponse.json({ message: 'Internal server error' }, {status:500})
}
})








const handler = handle(app)
export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
