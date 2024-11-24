import collectionSchema from "@/schemas/collection";
import { z } from "zod";
import { db } from "@/db/db_conn";
import { collections, links, tags } from "@/db/schema";

type collection = z.infer<typeof collectionSchema>;

export async function create_collection(
  collection: collection,
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
