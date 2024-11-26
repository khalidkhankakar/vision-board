import { relations } from "drizzle-orm"
import { pgTable, uuid,varchar ,index} from "drizzle-orm/pg-core"
import {board} from "."


const favorite = pgTable(
    "favorite",
    {
        id: uuid("id").defaultRandom().unique().notNull(),
        boardId: uuid("board_id").references(() => board.id).notNull(),
        userId: varchar("user_id").notNull(),
        orgId: varchar("org_id").notNull(),
    }
    , (t) => ({
        boardIdIdx: index("board_id_idx").on(t.boardId),
        userOrgIdx: index("user_org_id_idx").on(t.userId,t.orgId),
        userBoardIdx: index("user_board_idx").on(t.userId, t.boardId),
        userBoardOrgIdx: index("user_board_org_idx").on(t.userId, t.boardId, t.orgId),
}))


export const favoriteRelations = relations(favorite, ({ one }) => ({
    board: one(board, {
        fields: [favorite.boardId],
        references: [board.id],
    }),
}));


export default favorite;