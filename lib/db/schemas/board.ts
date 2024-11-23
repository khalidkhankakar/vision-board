import {  index, pgTable, timestamp, uuid,varchar } from "drizzle-orm/pg-core";
import {  createSelectSchema } from 'drizzle-zod';
const board = pgTable(
    "board",
    {
        id: uuid("id").defaultRandom().unique(),
        title: varchar("name").notNull(),
        orgId: varchar("org_id").notNull(),
        authorId: varchar("authorId").notNull(),
        authorName: varchar("authorName").notNull(),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    }
    , (t) => ({
        orgIdIdx: index("org_id_idx").on(t.orgId),
        authorIdIdx: index("author_id_idx").on(t.authorId),
    })
);

export const selectBoardSchema = createSelectSchema(board)
export default board;