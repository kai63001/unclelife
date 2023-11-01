"use client";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Percent } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { loadStripe } from "@stripe/stripe-js";
import { Icons } from "@/components/Icons";
import { useSupabase } from "@/app/hook/supabase-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";

export const revalidate = 3600 * 24; // 1 day
const PricingBox = () => {
  const { user, isLoading } = useSupabase();
  const [yearly, setYearly] = useState(true);
  const [loading, setLoading] = useState(false);
  const PriceDetailList = {
    basic: [
      "Unlimited Responses",
      "Unlimited Fields",
      "As many forms as you like",
      "Embed your form anywhere",
      "Widgets",
    ],
    pro: [
      "Everything in Basic",
      // 'Multi step form [soon]',
      "Full customization",
      "Remove branding",
      "Multiple Integrations",
      "Multiple Workspace",
      "Custom CSS/JS",
      "New features first",
      "5 mb file upload",
    ],
    enterprise: [
      "Everything in Pro",
      "Multiple users",
      "Custom domain",
      "20 mb file upload",
      "Priority support",
    ],
  };
  const [priceMonthlyAndYearly, setPriceMonthlyAndYearly]: any = useState({
    basic: {
      id: "",
      month: 0,
      year: 0,
    },
    enterprise: {
      month: {
        id: process.env.NEXT_PUBLIC_PRICE_ENTERPRISE_MONTH as string,
        price: 45,
      },
      year: {
        id: process.env.NEXT_PUBLIC_PRICE_ENTERPRISE_YEAR as string,
        price: 45 * 10,
      },
    },
    pro: {
      month: {
        id: process.env.NEXT_PUBLIC_PRICE_PRO_MONTH as string,
        price: 15,
      },
      year: {
        id: process.env.NEXT_PUBLIC_PRICE_PRO_YEAR as string,
        price: 15 * 10,
      },
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subscribe = async (priceId: any, plan: any = "pro") => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/stripe/subscription`, {
        priceId,
        plan,
      });
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_KEY as string
      );
      await stripe?.redirectToCheckout({ sessionId: data.id });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const portal = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/stripe/portal");
      if (data?.data?.url) {
        // window.location.href = data.data.url
        window.open(data.data.url, "_blank");
      }
      //new tab

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const checkDataIsExist = (plan: any = "pro") => {
    const interval = yearly ? "year" : "month";
    return !!priceMonthlyAndYearly[plan][interval].id;
  };

  return (
    <>
      <Alert>
        <Percent className="h-4 w-4" />
        <AlertTitle>Special Offer!</AlertTitle>
        <AlertDescription>
          The first 20 people who use the code <strong>BETA20</strong> will get
          a 20% discount on their purchase!
        </AlertDescription>
      </Alert>
      <div className={"flex justify-center space-x-3 mt-7 mb-5"}>
        <span className={"font-bold"}>Monthly</span>
        <span className={""}>
          <Switch
            aria-label="switchYearlyOrMonth"
            checked={yearly}
            onCheckedChange={(e) => setYearly(e)}
            id="airplane-mode"
          />
        </span>
        <span className={"font-bold"}>
          Yearly{" "}
          <Badge variant="destructive" className="absolute ml-2">
            Save 2 months
          </Badge>
        </span>
      </div>
      <div
        className={
          "flex items-center space-x-3 flex-col md:flex-row space-y-3 md:space-y-0"
        }
      >
        <div
          className={
            "md:flex-1 border rounded-2xl shadow-lg bg-background p-5 relative w-full"
          }
        >
          <h2 className={"text-3xl text-center font-bold"}>Basic</h2>
          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <Image
                src={"https://cdn.unclelife.co/free.webp"}
                width={160}
                height={160}
                alt={"basic"}
                className=""
              />
            </div>
            <h3 className={"text-3xl font-bold text-center my-5"}>Free</h3>
            <div className={"w-full flex justify-center mb-2"}>
              <Link href={"/home"} className={"w-full px-10"}>
                <Button
                  className={
                    "w-full py-3 bg-gradient-to-r from-red-500 to-orange-500"
                  }
                >
                  Try Now
                </Button>
              </Link>
            </div>
          </div>
          <p className={"my-2"}>
            All the basics tools to create beautiful forms and widgets.
          </p>
          <div className={"flex flex-col space-y-1"}>
            {PriceDetailList.basic.map((item, index) => (
              <div className={"flex space-x-3"} key={index}>
                <Check size={24} color={"#f2272a"} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className={
            "md:flex-1 border-4 border-[#E43D47] rounded-2xl shadow-lg p-5 relative w-full"
          }
        >
          <h2 className={"text-3xl font-bold text-center"}>Pro</h2>
          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <Image
                src={"https://cdn.unclelife.co/pro.webp"}
                width={285}
                height={198}
                alt={"pro"}
                className=""
              />
            </div>
            <h3 className={"text-3xl font-bold text-center my-5"}>
              {priceMonthlyAndYearly.pro.month.price === 0 ? (
                <div className={"flex justify-center"}>
                  <Skeleton className="w-[130px] h-[40px] rounded-full" />
                </div>
              ) : (
                <div>
                  <span className={"text-3xl font-bold"}>$</span>
                  <span className={"text-3xl font-bold"}>
                    {yearly
                      ? (priceMonthlyAndYearly.pro.year.price / 12).toFixed(2)
                      : priceMonthlyAndYearly.pro.month.price}
                  </span>
                  <span className={"text-lg font-bold"}>/mo</span>
                </div>
              )}
            </h3>
            <div className={"w-full flex justify-center px-10 mb-2"}>
              {user ? (
                isLoading ? (
                  <Button
                    disabled={true}
                    className={"w-full"}
                    variant={"secondary"}
                  >
                    <Icons.spinner className="animate-spin mr-2 h-5 w-5" />
                  </Button>
                ) : user.is_subscribed ? (
                  <Button
                    className={
                      "w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    }
                    onClick={portal}
                    variant={"secondary"}
                  >
                    Manage Subscription
                  </Button>
                ) : (
                  <Button
                    disabled={!checkDataIsExist() || loading}
                    onClick={() =>
                      subscribe(
                        yearly
                          ? priceMonthlyAndYearly.pro.year.id
                          : priceMonthlyAndYearly.pro.month.id
                      )
                    }
                    className={
                      "w-full bg-gradient-to-r from-red-500 to-orange-500 py-3 text-white"
                    }
                    variant={"secondary"}
                  >
                    {loading ? (
                      <Icons.spinner className="animate-spin mr-2 h-5 w-5" />
                    ) : (
                      "🚀 Start Trial"
                    )}
                  </Button>
                )
              ) : (
                <Link href={"/login"} className={"w-full"}>
                  <Button
                    className={
                      "w-full bg-gradient-to-r from-red-500 to-orange-500 py-3 text-white"
                    }
                    variant={"secondary"}
                  >
                    🚀 Start Trial
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <p className={"my-2"}>
            Everything you need to create beautiful and professional forms and
            widget, and support an indie dev.
          </p>

          <div className={"flex flex-col space-y-1"}>
            {PriceDetailList.pro.map((item, index) => (
              <div className={"flex space-x-3"} key={index}>
                <Check size={24} color={"#f2272a"} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className={
            "md:flex-1 border rounded-2xl shadow-lg p-5 relative w-full -mt-1"
          }
        >
          <h2 className={"text-3xl font-bold"}>Team</h2>
          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <Image
                src={"https://cdn.unclelife.co/team.webp"}
                width={160}
                height={160}
                alt={"basic"}
                className=""
              />
            </div>
            <h3 className={"text-3xl font-bold text-center my-5"}>
              <div>
                <span className={"text-3xl font-bold"}>$</span>
                <span className={"text-3xl font-bold"}>
                  {yearly
                    ? (
                        priceMonthlyAndYearly.enterprise.year.price / 12
                      ).toFixed(2)
                    : priceMonthlyAndYearly.enterprise.month.price}
                </span>
                <span className={"text-lg font-bold"}>/mo</span>
              </div>
            </h3>
            <div className={"w-full flex justify-center px-10 mb-2"}>
              {user ? (
                isLoading ? (
                  <Button
                    disabled={true}
                    className={"w-full"}
                    variant={"secondary"}
                  >
                    <Icons.spinner className="animate-spin mr-2 h-5 w-5" />
                  </Button>
                ) : user.is_enterprise ? (
                  <Button
                    className={
                      "w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    }
                    onClick={portal}
                    variant={"secondary"}
                  >
                    Manage Subscription
                  </Button>
                ) : (
                  <Button
                    disabled={!checkDataIsExist() || loading}
                    onClick={() =>
                      subscribe(
                        yearly
                          ? priceMonthlyAndYearly.enterprise.year.id
                          : priceMonthlyAndYearly.enterprise.month.id,
                        "team"
                      )
                    }
                    className={
                      "w-full bg-gradient-to-r from-red-500 to-orange-500 py-3 text-white"
                    }
                    variant={"secondary"}
                  >
                    {loading ? (
                      <Icons.spinner className="animate-spin mr-2 h-5 w-5 " />
                    ) : (
                      "🚀 Upgrade"
                    )}
                  </Button>
                )
              ) : (
                <Link href={"/login"} className={"w-full"}>
                  <Button
                    className={
                      "w-full bg-gradient-to-r from-red-500 to-orange-500 py-3 text-white"
                    }
                    variant={"secondary"}
                  >
                    🚀 Start Trial
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <p className={"my-2"}>
            For organizations seeking collaborative form solutions.
          </p>
          <div className={"flex flex-col space-y-1"}>
            {PriceDetailList.enterprise.map((item, index) => (
              <div className={"flex space-x-3"} key={index}>
                <Check size={24} color={"#f2272a"} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          {/* <div
            className={
              "w-full absolute bottom-[10px] left-0 flex justify-center p-5"
            }
          >
            {user ? (
              isLoading ? (
                <Button
                  disabled={true}
                  className={"w-full"}
                  variant={"secondary"}
                >
                  <Icons.spinner className="animate-spin mr-2 h-5 w-5" />
                </Button>
              ) : user.is_enterprise ? (
                <Button
                  className={"w-full"}
                  onClick={portal}
                  variant={"secondary"}
                >
                  Manage Subscription
                </Button>
              ) : (
                <Button
                  disabled={!checkDataIsExist() || loading}
                  onClick={() =>
                    subscribe(
                      yearly
                        ? priceMonthlyAndYearly.enterprise.year.id
                        : priceMonthlyAndYearly.enterprise.month.id
                    )
                  }
                  className={"w-full"}
                  variant={"secondary"}
                >
                  {loading ? (
                    <Icons.spinner className="animate-spin mr-2 h-5 w-5" />
                  ) : (
                    "Start Trial"
                  )}
                </Button>
              )
            ) : (
              <Link href={"/login"} className={"w-full"}>
                <Button
                  className={"w-full"}
                  onClick={portal}
                  variant={"secondary"}
                >
                  Start Trial
                </Button>
              </Link>
            )}
          </div> */}
        </div>
      </div>
      <div className={"flex justify-center"}>
        <p className={"text-center text-md text-gray-500 my-5"}>
          All plans include a 3-day free trial. Cancel anytime
        </p>
      </div>
    </>
  );
};

export default PricingBox;
