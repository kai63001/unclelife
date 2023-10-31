import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { ArrowRightCircle, ShieldCheck } from "lucide-react";
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
            <h1 className="text-white font-semibold text-5xl leading-snug">
              Simple-to-Create Forms for Notion and Level up with Widgets
            </h1>
            <p className="my-4 text-white">
              Create beautiful forms and widget connected to your Notion pages
            </p>
            <div className="flex space-x-2">
              <button className="bg-white text-[#EA7252] font-semibold px-3 py-3 rounded-md flex items-center">
                Create a Form
                <ArrowRightCircle className="ml-2" size={20} />
              </button>
              <button className="font-semibold px-3 py-3 rounded-md flex items-center border-2 duration-300 border-white hover:bg-white text-white hover:text-[#EA7252]">
                See Live Example
              </button>
            </div>
          </div>
          <div className="w-2/5 relative">
            <div className="absolute -top-40">
              <ScrollArea className="w-[460px] h-[500px] top-0 rounded-3xl shadow-md bg-background">
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
            <h2 className="text-5xl font-semibold">
              Create Forms the Way You Want
            </h2>
            <p className="text-center whitespace-pre-line mt-2 font-light">
              Break free from the monotony of traditional forms.
              {"\n"}
              Discover UncleLife — your gateway to free, intuitive, and engaging
              form building.
            </p>
          </div>
        </section>
        <section className="max-w-6xl w-full m-auto flex flex-col space-y-12 mt-10 rounded-3xl">
          <div className="flex w-full items-center space-x-4">
            <div className="w-5/12">asda</div>
            <div className="w-7/12">
              <h3 className="font-semibold text-3xl">Create next-level Form</h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`Say goodbye to boring forms made with old tools. 👋

UncleLife enables you to craft amazing forms with unlimited responses, offering complete customization at your fingertips`}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center space-x-4">
            <div className="w-6/12">
              <h3 className="font-semibold text-3xl">
                Unleash Unlimited Possibilities
              </h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`Dive into a world of endless creativity with UncleLife. 

Enjoy unlimited responses and full customization to make every form uniquely and colorful.`}
              </p>
            </div>
            <div className="w-6/12">asda</div>
          </div>
          <div className="flex w-full items-center space-x-4">
            <div className="w-6/12">asda</div>
            <div className="w-6/12">
              <h3 className="font-semibold text-3xl">
                Seamless Notion Integration
              </h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`With UncleLife, every form submission finds its way to your Notion database effortlessly. 

Capture responses in real-time and keep your data organized and accessible right within Notion.`}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center space-x-4">
            <div className="w-6/12">
              <h3 className="font-semibold text-3xl">
                Customize to Your Heart’s Content
              </h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`UncleLife grants you the creative freedom to tailor every\n form to perfection. 

Customize layouts, themes, and fields to mirror your \n brand’s essence and provide a delightful user experience.`}
              </p>
            </div>
            <div className="w-6/12">asda</div>
          </div>
          <div className="flex w-full items-center space-x-4">
            <div className="w-5/12">asda</div>
            <div className="w-7/12">
              <h3 className="font-semibold text-3xl">Intuitive Form Logic</h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`Unleash the power of smart forms with UncleLife. 

Our support for form logic lets you create intelligent, interactive forms that respond to user inputs, ensuring a streamlined and engaging user experience.`}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center space-x-4">
            <div className="w-7/12">
              <h3 className="font-semibold text-3xl">Notifications</h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`After someone fills out your form on UncleLife, you can send them an email. This can be a thank you note or a confirmation of their submission. You can also send yourself an email when someone submits`}
              </p>
            </div>
            <div className="w-5/12">asda</div>
          </div>
        </section>
        <section className="w-full m-auto flex flex-col justify-center  items-center bg-gradient-to-r from-[#6b6ea7] to-[#3b79ed] py-10 mt-10">
          <h3 className="flex justify-center items-center text-2xl text-white">
            <ShieldCheck size={40} className="mr-2 text-white" />
            Your data is secure
          </h3>
          <div className="mx-auto max-w-2xl text-center text-white text-sm my-2">
            {`Ensuring the safety of your data and privacy tops our priority list. We only access the Notion tables you choose to share with us, without prying into your entire workspace. You hold the power to revoke our access anytime directly from Notion. We uphold a firm policy of not storing the content of your form submissions — it's a direct journey from your form to your Notion table.`}
          </div>
        </section>
        <section className="max-w-4xl w-full m-auto flex flex-col justify-center  items-center bg-gradient-to-r from-[#EA7252] to-[#E43D47] mt-10 rounded-3xl">
          <div className="text-center pt-16 px-20">
            <svg
              className="mx-auto"
              width="92"
              height="91"
              viewBox="0 0 92 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.603516"
                y="0.499756"
                width="90.5"
                height="90.5"
                rx="13.4698"
                fill="white"
              />
              <path
                d="M55.5968 11.611L48.0361 37.2007C54.2579 37.6636 60.0486 38.0945 66.8188 38.5979C56.7573 52.8936 47.1603 66.5289 37.5632 80.1643L36.7284 79.7511L45.8174 49.8518L22.8633 50.3603L54.7895 11.1931L55.5968 11.611Z"
                fill="#FFD150"
              />
              <path
                d="M55.597 11.6108L52.9894 37.5692L48.0361 37.2007L55.597 11.6108Z"
                fill="#F4A903"
              />
              <path
                d="M66.8191 38.5979L68.8432 44.1201L37.5635 80.1643L66.8191 38.5979Z"
                fill="#EB8800"
              />
              <path
                d="M22.8633 50.3605L44.7583 53.3358L45.8173 49.8521L22.8633 50.3605Z"
                fill="#285791"
              />
              <path
                d="M48.0939 37.3428L55.6548 11.7529L54.8473 11.3352L42.907 25.9836L38.0152 42.5402L56.7979 43.9374L40.8117 66.6507L36.7861 79.8928C37.0642 80.0305 37.3428 80.1682 37.6209 80.306L66.8765 38.7397L48.0939 37.3428Z"
                fill="#FCC53A"
              />
            </svg>
            <p className="text-center whitespace-pre-line mt-2 text-white text-4xl font-medium mb-10 pt-10">
              Unleash create a unique and beautiful form in less than 2 minutes
            </p>
          </div>
          <div className="px-20 rounded-t-3xl overflow-hidden">
            <video
              src="https://cdn.unclelife.co/1017.mp4"
              className="rounded-t-3xl overflow-hidden"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
            ></video>
          </div>
        </section>
      </main>
      <FooterIndex />
    </>
  );
}
