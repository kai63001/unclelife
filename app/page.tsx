import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { ArrowRightCircle, ShieldCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";
import FAQs from "./index/components/FAQs";
import VideoIndex from "./index/components/VideoIndex";
import PomodoroVideoIndex from "./index/components/PomodoroVideoIndex";
// import SlideTrandingForm from "./index/components/SlideTrandingForm";

const IndexNavbar = dynamic(() => import("./index/components/Navbar"), {
  ssr: false,
});
const FooterIndex = dynamic(() => import("./index/components/FooterIndex"));

const PricingBox = dynamic(() => import("./pricing/components/PricingBox"), {
  ssr: false,
});

const SlideTrandingForm = dynamic(
  () => import("./index/components/SlideTrandingForm"),
  {
    ssr: false,
  }
);

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
        <section className="max-w-7xl px-4 py-4 lg:px-14 lg:py-14 mx-auto w-full flex flex-col lg:flex-row justify-center text-center lg:text-left lg:justify-between items-center relative bg-gradient-to-r from-[#EA7252] to-[#E43D47] mt-10 rounded-3xl">
          <div className="w-full lg:w-3/5">
            <h1 className="text-white font-semibold text-4xl lg:text-5xl leading-snug">
              Simple-to-Create Forms for Notion and Level up with Widgets
            </h1>
            <p className="my-4 text-white">
              Create beautiful forms and widget connected to your Notion pages
            </p>
            <div className="flex justify-center lg:justify-start space-x-2">
              <Link href="/form/create" className="inline-block">
                <button className="bg-white text-[#b85a3f] border-2 border-white font-semibold px-2 py-2 md:px-3 md:py-3 rounded-md flex items-center">
                  Create a Form
                  <ArrowRightCircle className="ml-2" size={20} />
                </button>
              </Link>
              <Link
                href="https://unclelife-form.notion.site/unclelife-form/Notion-Form-20bf97e746c942bc8504230b33840653"
                target="_blank"
              >
                <button className="font-semibold px-2 py-2 md:px-3 md:py-3 rounded-md flex items-center border-2 duration-300 border-white hover:bg-white text-white hover:text-[#EA7252]">
                  See Live Example
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-2/5 relative pb-64 lg:pb-0">
            <div className="hidden lg:block">
              <div className="whitespace-pre-line z-50 transform -translate-x-52 translate-y-72 rotate-6 -left-40">
                {"This form was created\nusing UncleLife 🤩"}
              </div>
              <svg
                className="z-50 absolute transform -translate-x-14 translate-y-56 scale-x-[1] rotate-[190deg] dark:fill-white"
                width="67"
                height="47"
                viewBox="0 0 67 47"
              >
                <path d="M3.04155 46.2853C3.19913 46.8146 3.75598 47.116 4.28531 46.9584L12.9112 44.3904C13.4405 44.2328 13.7418 43.676 13.5843 43.1466C13.4267 42.6173 12.8698 42.316 12.3405 42.4735L4.67307 44.7562L2.39041 37.0888C2.23282 36.5594 1.67597 36.2581 1.14665 36.4157C0.617322 36.5733 0.315967 37.1301 0.473552 37.6594L3.04155 46.2853ZM66 1C65.936 0.00204828 65.9354 0.00209071 65.9346 0.00214323C65.9341 0.00217371 65.9331 0.00223648 65.9322 0.00229829C65.9303 0.00242209 65.9279 0.00258709 65.9248 0.00279554C65.9187 0.00321244 65.9102 0.00380315 65.8994 0.00458564C65.8778 0.00615061 65.8469 0.00848276 65.8068 0.0117258C65.7266 0.0182119 65.6099 0.0283423 65.4584 0.0432674C65.1553 0.0731167 64.7128 0.122151 64.1443 0.199578C63.0075 0.354421 61.3663 0.622905 59.3285 1.07881C55.2538 1.99047 49.5888 3.65269 43.1994 6.65758C30.4123 12.6713 14.7373 24.0582 3.1205 45.524L4.87945 46.4759C16.2626 25.4418 31.5877 14.3287 44.0506 8.46742C50.2862 5.53481 55.8087 3.91578 59.7652 3.03056C61.7431 2.58803 63.3284 2.32917 64.4143 2.18128C64.9571 2.10734 65.375 2.06116 65.6544 2.03364C65.7941 2.01988 65.8992 2.01078 65.9681 2.00521C66.0025 2.00243 66.0278 2.00053 66.0439 1.99936C66.0519 1.99878 66.0576 1.99838 66.061 1.99816C66.0626 1.99804 66.0637 1.99797 66.0642 1.99794C66.0645 1.99792 66.0644 1.99792 66.0645 1.99791C66.0643 1.99793 66.064 1.99795 66 1Z"></path>
              </svg>
            </div>
            <div className="absolute w-full flex justify-center mt-5 lg:-top-40">
              <ScrollArea className="w-full h-[500px] top-0 rounded-3xl shadow-md bg-background">
                <iframe
                  src="/public/form/7b61afb5-0828-40bd-bae9-6fc38505165c"
                  title="UncleLife Demo Form"
                  className="w-full h-[73vh] overflow-hidden"
                  height={"100%"}
                  scrolling="no"
                  loading="lazy"
                />
              </ScrollArea>
            </div>
          </div>
        </section>
        <section className="max-w-4xl w-full m-auto flex justify-center items-center mt-72 lg:mt-52 rounded-3xl">
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
          <div className="flex flex-col lg:flex-row space-y-3 w-full items-center space-x-4">
            <div className="w-full flex justify-center lg:w-5/12">
              <Image
                src="https://cdn.unclelife.co/Create%20next-level%20Form.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Create next-level Form"
                loading="eager"
              />
            </div>
            <div className="w-full lg:w-7/12">
              <h3 className="font-semibold text-3xl">Create next-level Form</h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`Say goodbye to boring forms made with old tools. 👋

UncleLife enables you to craft amazing forms with unlimited responses, offering complete customization at your fingertips`}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-3 w-full items-center space-x-4">
            <div className="w-full lg:w-6/12 order-2 lg:order-1">
              <h3 className="font-semibold text-3xl">
                Unleash Unlimited Possibilities
              </h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`Dive into a world of endless creativity with UncleLife. 

Enjoy unlimited responses and full customization to make every form uniquely and colorful.`}
              </p>
            </div>
            <div className="w-full flex justify-center lg:w-6/12 order-1 lg:order-2">
              <Image
                src="https://cdn.unclelife.co/Unleash%20Unlimited%20Possibilities.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Unleash Unlimited Possibilities"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-3 w-full items-center space-x-4">
            <div className="w-full flex justify-center lg:w-6/12">
              <Image
                src="https://cdn.unclelife.co/Seamless%20Notion%20Integration.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Seamless Notion Integration"
              />
            </div>
            <div className="w-full lg:w-6/12">
              <h3 className="font-semibold text-3xl">
                Seamless Notion Integration
              </h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`With UncleLife, every form submission finds its way to your Notion database effortlessly. 

Capture responses in real-time and keep your data organized and accessible right within Notion.`}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-3 w-full items-center space-x-4">
            <div className="w-full lg:w-6/12 order-2 lg:order-1">
              <h3 className="font-semibold text-3xl">
                Customize to Your Heart{`'`}s Content
              </h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`UncleLife grants you the creative freedom to tailor every\n form to perfection. 

Customize layouts, themes, and fields to mirror your \n brand’s essence and provide a delightful user experience.`}
              </p>
            </div>
            <div className="w-full lg:w-6/12 order-1 lg:order-2">
              <Image
                src="https://cdn.unclelife.co/Customize%20to%20Your%20Heart%E2%80%99s%20Content.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Customize to Your Hearts Content"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-3 w-full items-center space-x-4">
            <div className="w-full flex justify-center lg:w-5/12">
              <Image
                src="https://cdn.unclelife.co/Intuitive%20Form%20Logic.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Intuitive Form Logic"
                loading="lazy"
              />
            </div>
            <div className="w-full lg:w-7/12">
              <h3 className="font-semibold text-3xl">Intuitive Form Logic</h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`Unleash the power of smart forms with UncleLife. 

Our support for form logic lets you create intelligent, interactive forms that respond to user inputs, ensuring a streamlined and engaging user experience.`}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-3 w-full items-center space-x-4">
            <div className="w-full md:w-7/12 order-2 md:order-1">
              <h3 className="font-semibold text-3xl">Notifications</h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`After someone fills out your form on UncleLife, you can send them an email. This can be a thank you note or a confirmation of their submission. You can also send yourself an email when someone submits`}
              </p>
            </div>
            <div className="w-7/12 pb-5 md:pb-0 md:w-5/12 flex justify-center md:justify-end order-1 md:order-2">
              <Image
                src="https://cdn.unclelife.co/Notifications.webp"
                width={400}
                height={400}
                className="rounded-3xl"
                alt="Notifications"
                loading="lazy"
              />
            </div>
          </div>
        </section>
        <section className="rounded-2xl lg:rounded-none w-full m-auto flex flex-col justify-center  items-center bg-gradient-to-r from-[#6b6ea7] to-[#3b79ed] py-10 mt-10">
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
            <p className="text-center whitespace-pre-line mt-2 text-white text-2xl lg:text-4xl font-medium mb-10 pt-10">
              Unleash create a unique and beautiful form in less than 2 minutes
            </p>
          </div>
          <div className="px-5 lg:px-20 rounded-t-3xl overflow-hidden">
            <VideoIndex />
          </div>
        </section>
        <section className="w-full m-auto flex flex-col justify-center items-center py-10 mt-10">
          <h3 className="text-3xl font-semibold">Trending Form!</h3>
          <SlideTrandingForm />
        </section>
        <section className="max-w-6xl w-full m-auto flex flex-col space-y-12 mt-10 rounded-3xl">
          <div className="flex w-full items-center space-x-4 flex-col md:flex-row">
            <div className="w-full md:w-6/12 order-2 md:order-1">
              <h3 className="font-semibold text-3xl">Unlimited Submission</h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`Enjoy Unlimited Submissions on All Your Forms – Bid Farewell to Stressful Quotas and Metrics.`}
              </p>
            </div>
            <div className="w-full md:w-6/12 order-1 md:order-2 pb-5 mb:pb-0">
              <Image
                src="https://cdn.unclelife.co/Submission.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Create next-level Form"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex w-full items-center space-x-4 flex-col md:flex-row">
            <div className="w-full md:w-6/12 pb-5 mb:pb-0">
              <Image
                src="https://cdn.unclelife.co/1.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Create next-level Form"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-6/12">
              <h3 className="font-semibold text-3xl">
                Unlimited Field Options
              </h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`Input data effortlessly through your form fields. With UncleLife, you have the freedom to create and manage as many databases as you desire, mirroring your Notion setup seamlessly.`}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center space-x-4 flex-col md:flex-row">
            <div className="w-full md:w-6/12 order-2 md:order-1">
              <h3 className="font-semibold text-3xl">Custom Color</h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`Users can fully customize the look and feel of their form to suit their aesthetics. This includes the ability to customize colors, themes, text, and images.`}
              </p>
            </div>
            <div className="w-full md:w-6/12 order-1 md:order-2 pb-5 mb:pb-0">
              <Image
                src="https://cdn.unclelife.co/2.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Create next-level Form"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex w-full items-center space-x-4 flex-col md:flex-row">
            <div className="w-full md:w-6/12 pb-5 mb:pb-0">
              <Image
                src="https://cdn.unclelife.co/3.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Create next-level Form"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-6/12">
              <h3 className="font-semibold text-3xl">Mode Dark</h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`You can choose a beautiful dark mode. in the form you want it to fit Your Integrate`}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center space-x-4 flex-col md:flex-row">
            <div className="w-full md:w-6/12 order-2 md:order-1">
              <h3 className="font-semibold text-3xl">
                Unlimited Form Creation
              </h3>
              <p className="whitespace-pre-line text-muted-foreground mt-2 font-light">
                {`You have the liberty to create endless forms, embracing a myriad of formats to suit your needs.`}
              </p>
            </div>
            <div className="w-full md:w-6/12 order-1 md:order-2 pb-5 mb:pb-0">
              <Image
                src="https://cdn.unclelife.co/4.webp"
                width={500}
                height={500}
                className="rounded-3xl"
                alt="Create next-level Form"
                loading="lazy"
              />
            </div>
          </div>
        </section>
        <section className="max-w-6xl w-full justify-center text-center m-auto flex flex-col space-y-12 mt-10 rounded-3xl">
          <h3 className="text-4xl">Pricing</h3>
          <PricingBox />
        </section>
        <section className="max-w-7xl w-full m-auto flex text-center px-5 lg:px-0 lg:text-left flex-col lg:flex-row py-10 mt-10 rounded-3xl bg-gradient-to-r from-[#AF36CD] to-[#E15066]">
          <div className="lg:w-5/12">
            <div className="lg:absolute lg:ml-12 lg:-mt-16 w-full lg:w-[450px] lg:h-[300px]">
              <PomodoroVideoIndex />
            </div>
          </div>
          <div className="lg:w-7/12 mt-5 lg:mt-0">
            <h2 className="text-white text-lg lg:text-5xl">
              Pomodoro Set work and break intervals Audio and visual alerts
            </h2>
            <Link href="/widget/pomodoro">
              <button className="bg-white rounded-full px-5 py-3 mt-3">
                Create a Pomodoro
              </button>
            </Link>
          </div>
        </section>
        {/* pomodoro section */}
        <section className="w-full m-auto flex flex-col justify-center  items-center bg-gradient-to-r from-[#E43D47] to-[#EA7252] py-10 mt-10 rounded-lg lg:rounded-none">
          <h3 className="flex justify-center items-center text-2xl text-white">
            Wanna stay up-to-date?
          </h3>
          <div className="mx-auto max-w-2xl text-center text-white text-sm my-2">
            {`Sign up for our newsletter and we'll keep you updated with news about Uncle Life`}
          </div>
          <Link href="/register" className="inline-block">
            <button className="bg-white text-[#b85a3f] mt-5 border-white font-semibold px-3 py-3 rounded-md flex items-center">
              Sign up
              <ArrowRightCircle className="ml-2" size={20} />
            </button>
          </Link>
        </section>
        <section className="max-w-4xl w-full m-auto flex flex-col justify-center  items-center py-10 mt-10">
          <h3 className="text-2xl font-semibold">
            Frequently Asked Questions (FAQs)
          </h3>
          <FAQs />
        </section>
      </main>
      <FooterIndex />
    </>
  );
}
