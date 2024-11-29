'use server'

import { eq } from "drizzle-orm"
import { db } from "./db/drizzle"
import { board } from "./db/schemas"

export const getBoard = async (id:string) => {
    const [singleBoard] = await db.select().from(board).where(eq(board.id, id))
    return singleBoard;
}
