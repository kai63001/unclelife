import Image from "next/image";
import dynamic from "next/dynamic";
const IndexNavbar = dynamic(() => import("./index/components/Navbar"), {
  ssr: true,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header>
        <IndexNavbar />
      </header>
      <section className="max-w-2xl mx-auto w-full flex-col justify-between pt-8 items-center relative">
        <h1 className="text-center text-5xl font-extrabold mt-28">
          Level up your Notion docs with Forms and Widgets
        </h1>
        <p className="text-muted-foreground my-4 text-center text-lg">
          Create beautiful forms and widget connected to your Notion pages
        </p>
      </section>
    </main>
  );
}
