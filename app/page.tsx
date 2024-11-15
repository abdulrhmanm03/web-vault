import Navbar from "@/components/navbar/Navbar";
import RowOfContent from "@/components/RowOfContent";

export default function Home() {
  return (
    <main className="px-12 py-5 ">
      <Navbar />
      <RowOfContent />
      <RowOfContent />
    </main>
  );
}
