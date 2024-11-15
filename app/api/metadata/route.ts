import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { z } from "zod";

const querySchema = z.object({
  url: z.string().url(),
});

export async function GET(req: Request) {
  try {
    const urlObj = new URL(req.url);
    const query = Object.fromEntries(urlObj.searchParams.entries());
    const { url } = querySchema.parse(query);

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const image = $('meta[property="og:image"]').attr("content") || "";

    return NextResponse.json({ title, image });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 },
      );
    }
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 },
    );
  }
}
