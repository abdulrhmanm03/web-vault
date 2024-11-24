import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import collectionSchema from "@/schemas/collection";
import { create_collection } from "@/db/quereis";

export async function POST(req: Request) {
  const { userId } = await auth();

  try {
    const body = await req.json();
    const collection = collectionSchema.parse(body);

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    await create_collection(collection, userId);

    console.log("created", collection, "for", userId);

    return new Response("Collection created successfully", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error);
      return new Response(JSON.stringify({ errors: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
