import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer, unique } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
});

export const usersRelations = relations(users, ({ many }) => ({
  collections: many(collections),
  links: many(links),
}));

export const collections = sqliteTable(
  "collections",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description"),
    user_id: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    created_at: integer("timestamp1", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    uniqueUserCollectionName: unique().on(table.user_id, table.title),
  }),
);

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  user: one(users),
  links: many(links),
  tags: many(tags),
}));

export const links = sqliteTable("links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  link: text("link").notNull(),
  user_id: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  collection_id: integer("collection_id").references(() => collections.id, {
    onDelete: "cascade",
  }),
  created_at: integer("timestamp1", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const linksRelations = relations(links, ({ one }) => ({
  user: one(users),
  collection: one(collections),
}));

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tag: text("tag").notNull(),
  collection_id: integer("collection_id")
    .references(() => collections.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const tagsRelations = relations(links, ({ one }) => ({
  collection: one(collections),
}));
