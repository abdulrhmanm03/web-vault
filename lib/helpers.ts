import * as cheerio from "cheerio";

export async function extractMetadata(url: string): Promise<{
  title: string;
  image: string;
}> {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const title =
    $('meta[property="og:title"]').attr("content") || $("title").text();
  const image = $('meta[property="og:image"]').attr("content") || "";

  return { title, image };
}
