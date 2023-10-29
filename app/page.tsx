import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const IndexNavbar = dynamic(() => import("./index/components/Navbar"), {
  ssr: true,
});
import type { Metadata } from "next";
// import PricingBox from "@/app/pricing/components/PricingBox";
// import FeatureIndex from "@/app/index/components/Feature";
// import FooterIndex from "@/app/index/components/FooterIndex";
import FAQs from "@/app/index/components/FAQs";
import HeaderBannder from "./index/components/HeaderBanner";
// import YoutubeEmbedIndex from "./index/components/YoutubeEmbed";

const FooterIndex = dynamic(() => import("./index/components/FooterIndex"));
const PricingBox = dynamic(() => import("./pricing/components/PricingBox"));
const YoutubeEmbedIndex = dynamic(
  () => import("./index/components/YoutubeEmbed"));
const FeatureIndex = dynamic(() => import("./index/components/Feature"));

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
        <section className="max-w-4xl mx-auto w-full flex-col justify-between pt-8 items-center relative">
          <HeaderBannder />
          <p className="text-muted-foreground my-4 text-center text-lg">
            Create beautiful forms and widget connected to your Notion pages
          </p>
          <div className={"flex space-x-3 justify-center py-4"}>
            <Button asChild>
              <Link href={"/form/create"}>Create a form</Link>
            </Button>
            <Button variant={"secondary"} asChild>
              <Link
                target={"_blank"}
                href={
                  "https://unclelife-form.notion.site/unclelife-form/Notion-Form-20bf97e746c942bc8504230b33840653"
                }
              >
                See Live Example
              </Link>
            </Button>
          </div>
          <div className={"text-center -mt-3 -ml-[170px]"}>
            <p className={"text-muted-foreground text-xs"}>No card required</p>
          </div>
        </section>
        <section className="max-w-5xl mx-auto w-full flex-col justify-between pt-3 mt-10 items-center relative">
          <FeatureIndex />
        </section>
        <span
          className={
            "mx-auto px-3 py-1 bg-red-600 rounded-full text-sm font-bold mt-12 text-white"
          }
        >
          2 min
        </span>
        <h2 className="text-center text-3xl font-bold ">
          Create Forms the Way You Want
        </h2>
        <p className={"text-center text-muted-foreground"}>
          Creating custom forms for your Notion workspace has never been easier.
          Follow these steps:
        </p>
        <section className="max-w-5xl mx-auto w-full flex-col justify-between pt-3 items-center relative">
          <ol className={""}>
            <li className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
              <div>
                <h2 className={"text-2xl font-medium"}>
                  1. Sign Up & Connect to Notion
                </h2>
                <ul className={"text-muted-foreground p-0 m-0"}>
                  <li>Sign up on our platform.</li>
                  <li>
                    Connect to Notion from the {`'`}Integrations{`'`} section.
                  </li>
                  <li>Grant the necessary permissions.</li>
                </ul>
              </div>

              <div>
                <h2 className={"text-2xl font-medium"}>
                  2. Select a Create Form Menu
                </h2>
                <ul className={"text-muted-foreground p-0 m-0"}>
                  <li>
                    Choose the workspace you want to link your form with. Then
                    click create form without database.We handle the database
                    setup for you.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className={"text-2xl font-medium"}>
                  3. Create a Custom Form
                </h2>
                <ul className={"text-muted-foreground p-0 m-0"}>
                  <li>
                    Start by accessing the form builder tool. Here, you can add
                    essential input fields tailored to your needs.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className={"text-2xl font-medium"}>4. Publish & Share</h2>
                <ul className={"text-muted-foreground p-0 m-0"}>
                  <li>
                    {
                      "Once you're satisfied with the design and functionality, publish your form."
                    }
                  </li>
                </ul>
              </div>
            </li>
          </ol>
          <YoutubeEmbedIndex />
        </section>
        <section className="max-w-5xl mx-auto w-full flex-col justify-between pt-3 mt-10 items-center relative">
          <h2 className="text-center text-3xl font-bold">Pricing</h2>
          <PricingBox />
        </section>
        <section className="max-w-5xl mx-auto w-full flex-col justify-between pt-3 mt-10 items-center relative">
          <h2 className="text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <FAQs />
        </section>
      </main>
      <FooterIndex />
    </>
  );
}
