import { get_collection } from "@/db/quereis";
import { NextRequest, NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const collection_id = parseInt(id, 10);

  if (isNaN(collection_id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const collection = await get_collection(collection_id);

    if (!collection) {
      console.log("Collection not found");
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 },
      );
    }
    const { username } = await clerkClient.users.getUser(collection.user_id);

    return NextResponse.json({ username, ...collection });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
