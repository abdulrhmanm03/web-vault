import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clerk_id: text("clerk_id").notNull(),
  name: text("name").notNull(),
});
