// TODO: complete this to create a new collection and add it to the database
export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  return new Response("Hello, Next.js!", { status: 200 });
}
