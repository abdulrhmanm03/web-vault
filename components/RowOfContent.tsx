import { extractMetadata } from "@/lib/helpers";
import LinkContainer from "./LinkContainer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./shadcn/carousel";

const urls = [
  "https://letterboxd.com/film/seven-samurai/",
  "https://letterboxd.com/film/that-day-on-the-beach/",
  "https://en.wikipedia.org/wiki/Martin_Scorsese",
  "https://www.imdb.com/title/tt0075314/",
  "https://music.youtube.com/watch?v=PHgF6CrVZ0Y&list=RDAMVMwre1C-u03m8",
  "https://www.imdb.com/title/tt0804503/",
];

export default async function RowOfContent() {
  const posts = await Promise.all(
    urls.map(async (url) => {
      const { title, image } = await extractMetadata(url);
      return { title, image, url };
    }),
  );
  return (
    <Carousel className="my-20 mx-4">
      <p className="mx-4 mb-2">Trending this week</p>
      <hr />
      <CarouselContent>
        {posts.map(({ title, image, url }) => (
          <CarouselItem
            key={title}
            className="lg:basis-1/5 md:basis-1/4 sm:basis-1/3"
          >
            <LinkContainer key={title} title={title} image={image} url={url} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
