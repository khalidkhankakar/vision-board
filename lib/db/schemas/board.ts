import { InferModel, relations } from "drizzle-orm";
import {  index, pgTable, timestamp, uuid,varchar } from "drizzle-orm/pg-core";
import {favorite} from ".";
const board = pgTable(
    "board",
    {
        id: uuid("id").defaultRandom().unique().notNull(),
        title: varchar("name").notNull(),
        orgId: varchar("org_id").notNull(),
        authorId: varchar("authorId").notNull(),
        authorName: varchar("authorName").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    }
    , (t) => ({
        orgIdIdx: index("org_id_idx").on(t.orgId),
        authorIdIdx: index("author_id_idx").on(t.authorId),
    })
);

export const boardRelations = relations(board, ({ many }) => ({
    favorites: many(favorite),
}))

// type of board schema
export type IBoard = InferModel<typeof board>; // Type for full table rows
export type INewBoard = InferModel<typeof board, "insert">; // Type for insert operations

export default board;