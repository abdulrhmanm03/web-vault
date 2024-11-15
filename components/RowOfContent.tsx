import { extractMetadata } from "@/lib/helpers";
import LinkContainer from "./LinkContainer";

const urls = [
  "https://letterboxd.com/film/seven-samurai/",
  "https://letterboxd.com/film/that-day-on-the-beach/",
  "https://en.wikipedia.org/wiki/Martin_Scorsese",
  "https://www.imdb.com/title/tt0075314/",
  "https://music.youtube.com/watch?v=PHgF6CrVZ0Y&list=RDAMVMwre1C-u03m8",
];

export default async function RowOfContent() {
  const posts = await Promise.all(
    urls.map(async (url) => {
      const { title, image } = await extractMetadata(url);
      return { title, image, url };
    }),
  );
  return (
    <div className="my-20">
      <p className="mx-4 my-2">Trending this week</p>
      <hr />
      <div className="flex justify-center items-center">
        {posts.map(({ title, image, url }) => (
          <LinkContainer key={title} title={title} image={image} url={url} />
        ))}
      </div>
    </div>
  );
}
