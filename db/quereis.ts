import { db } from "@/db/db_conn";
import { collections, links, tags } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Collection } from "@/schemas/collection";

export async function create_collection(
  collection: Collection,
  user_id: string,
) {
  await db.transaction(async (trx) => {
    const { collection_id } = await trx
      .insert(collections)
      .values({
        title: collection.title,
        description: collection.description,
        user_id,
      })
      .returning({ collection_id: collections.id })
      .then((rows) => rows[0]);

    Promise.all([
      trx.insert(links).values(
        collection.links.map((link) => ({
          user_id,
          link,
          collection_id,
        })),
      ),

      collection.tags.length > 0 &&
        trx.insert(tags).values(
          collection.tags.map((tag) => ({
            tag,
            collection_id,
          })),
        ),
    ]);
  });
}

export async function get_collection(collection_id: number) {
  const [collection_date, links_data, tags_data] = await Promise.all([
    db.select().from(collections).where(eq(collections.id, collection_id)),
    db
      .select({ link: links.link })
      .from(links)
      .where(eq(links.collection_id, collection_id)),
    db
      .select({ tag: tags.tag })
      .from(tags)
      .where(eq(tags.collection_id, collection_id)),
  ]);

  if (collection_date.length == 0) {
    return null;
  }

  const links_ =
    links_data.length == 0 ? [] : links_data.map((link) => link.link);
  const tags_ = tags_data.length == 0 ? [] : tags_data.map((tag) => tag.tag);

  return {
    ...collection_date[0],
    links: links_,
    tags: tags_,
  };
}
