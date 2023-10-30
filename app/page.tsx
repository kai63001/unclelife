import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { ArrowRightCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const IndexNavbar = dynamic(() => import("./index/components/Navbar"), {
  ssr: true,
});
const FooterIndex = dynamic(() => import("./index/components/FooterIndex"));

export const metadata: Metadata = {
  title: "Uncle Life - Notion Forms & Widgets Simplified",
  description:
    "Platform for seamless Notion forms and widgets. Elevate your productivity and organization with our intuitive tools tailored for Notion enthusiasts.",
};

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col lg:p-0 px-5">
        <header>
          <IndexNavbar />
        </header>
        <section className="max-w-7xl px-14 py-14 mx-auto w-full flex justify-between items-center relative bg-gradient-to-r from-[#EA7252] to-[#E43D47] mt-10 rounded-3xl">
          <div className="w-3/5">
            <h1 className="text-white font-bold text-5xl leading-snug">
              Simple-to-Create Forms for Notion and Level up with Widgets
            </h1>
            <p className="my-4 text-white">
              Create beautiful forms and widget connected to your Notion pages
            </p>
            <div className="flex space-x-2">
              <button className="bg-white text-[#EA7252] font-bold px-3 py-3 rounded-md flex items-center">
                Create a Form
                <ArrowRightCircle className="ml-2" size={20} />
              </button>
              <button className="font-bold px-3 py-3 rounded-md flex items-center border-2 duration-300 border-white hover:bg-white text-white hover:text-[#EA7252]">
                See Live Example
              </button>
            </div>
          </div>
          <div className="w-2/5 relative">
            <div className="absolute -top-40">
              <ScrollArea className="w-[460px] h-[500px] top-0 rounded-3xl shadow-md">
                <iframe
                  src="/public/form/7b61afb5-0828-40bd-bae9-6fc38505165c"
                  className="w-[460px] h-[73vh] overflow-hidden"
                  height={"100%"}
                  scrolling="no"
                  loading="lazy"
                />
              </ScrollArea>
            </div>
          </div>
        </section>
        <section className="max-w-4xl w-full m-auto flex justify-center items-center mt-52 rounded-3xl">
          <div className="text-center">
            <h2 className="text-5xl font-bold">
              Create Forms the Way You Want
            </h2>
            <p className="text-center whitespace-pre-line mt-2">
              Break free from the monotony of traditional forms. 
              {'\n'}
              Discover
              UncleLife — your gateway to free, intuitive, and engaging form
              building.
            </p>
          </div>
        </section>
      </main>
      <FooterIndex />
    </>
  );
}
