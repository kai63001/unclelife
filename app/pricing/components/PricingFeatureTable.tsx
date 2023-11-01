"use client";

import { Switch } from "@/components/ui/switch";
import { Check } from "lucide-react";
import { useState } from "react";

const PricingFeatureTable = () => {
  const [yearly, setYearly] = useState(true);

  const priceMonthlyAndYearly: any = {
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
  };

  const features = [
    {
      name: "Form",
      list: [
        {
          name: "Number Responses",
          free: "Unlimited",
          pro: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Number of Forms",
          free: "Unlimited",
          pro: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Number of Fields",
          free: "Unlimited",
          pro: "Unlimited",
          enterprise: "Unlimited",
        },
        { name: "Integrate Anywhere", free: true, pro: true, enterprise: true },
        { name: "Dark Mode", free: true, pro: true, enterprise: true },

        {
          name: "Customize Everything",
          free: false,
          pro: true,
          enterprise: true,
        },
        {
          name: "Remove Branding",
          free: false,
          pro: true,
          enterprise: true,
        },
        {
          name: "Custom Back-href (Slug)",
          free: false,
          pro: true,
          enterprise: true,
        },
        {
          name: "Respondent Email Notifications",
          free: false,
          pro: true,
          enterprise: true,
        },
        { name: "Custom CSS", free: false, pro: true, enterprise: true },
        { name: "File Uploads", free: false, pro: "5 MB", enterprise: "20 MB" },
        { name: "Custom Redirects", free: false, pro: true, enterprise: true },
        {
          name: "Custom Success Messages",
          free: false,
          pro: true,
          enterprise: true,
        },
        { name: "Custom Blocks", free: false, pro: true, enterprise: true },
        { name: "Form Logic", free: false, pro: true, enterprise: true },
        {
          name: "Notion Workspaces",
          free: "1",
          pro: "Unlimited",
          enterprise: "Unlimited",
        },
        { name: "Premium Support", free: false, pro: false, enterprise: true },
        {
          name: "Collaboration",
          free: false,
          pro: false,
          enterprise: true,
          soon: true,
        },
        {
          name: "Custom Domain",
          free: false,
          pro: false,
          enterprise: true,
        },
      ],
    },
    {
      name: "Widget",
      list: [
        {
          name: "Pomodoro",
          free: true,
          pro: true,
          enterprise: true,
        },
        {
          name: "Habit Tracker",
          free: true,
          pro: true,
          enterprise: true,
          soon: true,
        },
      ],
    },
    {
      name: "Pomodoro",
      list: [
        {
          name: "Custom Pomodoro",
          free: true,
          pro: true,
          enterprise: true,
        },
        {
          name: "Custom Background",
          free: true,
          pro: true,
          enterprise: true,
        },
        {
          name: "Custom Font",
          free: true,
          pro: true,
          enterprise: true,
        },
        {
          name: "Upload Background",
          free: false,
          pro: true,
          enterprise: true,
        },
      ],
    },
  ];

  const renderFeatureValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? <Check className="h-6 w-6 m-auto" /> : "";
    }
    return value;
  };

  return (
    <div className="mx-auto my-8 overflow-y-auto">
      {features.map((featureCategory, index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold mb-4">{featureCategory.name}</h3>
          <table className="min-w-full border-t border-b rounded-lg mb-8 overflow-y-auto">
            <thead>
              <tr>
                <th className="py-4 px-6 border-b border-gray-300 text-left text-md font-bold tracking-wider w-40">
                  {index == 0 && (
                    <div className={"flex justify-start space-x-3 mt-7 mb-5"}>
                      <span className={"font-bold"}>Monthly</span>
                      <span className={""}>
                        <Switch
                          aria-label="switchYearlyOrMonth"
                          checked={yearly}
                          onCheckedChange={(e) => setYearly(e)}
                          id="switchPlan"
                        />
                      </span>
                      <span className={"font-bold"}>
                        Yearly{" "}
                        {/* <Badge variant="destructive" className="absolute ml-2">
                        Save 2 months
                      </Badge> */}
                      </span>
                    </div>
                  )}
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-center text-md font-bold tracking-wider">
                  Basic
                  {index == 0 && (
                    <div className="px-10 text-2xl my-2">
                      <span className={"text-3xl font-bold"}>$</span>
                      <span className={"text-3xl font-bold"}>0</span>
                      <span className={"text-lg font-bold"}>/mo</span>
                      <div className="opacity-0 text-xs">billed</div>
                    </div>
                  )}
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-center text-md font-bold tracking-wider bg-gradient-to-r from-purple-600 to-purple-800 text-white w-40">
                  Pro
                  {index == 0 && (
                    <div className="px-10 text-2xl my-2">
                      <span className={"text-3xl font-bold"}>$</span>
                      <span className={"text-3xl font-bold"}>
                        {yearly
                          ? (priceMonthlyAndYearly.pro.year.price / 12).toFixed(
                              2
                            )
                          : priceMonthlyAndYearly.pro.month.price}
                      </span>
                      <span className={"text-lg font-bold"}>/mo</span>
                      {yearly && (
                        <div className="text-xs font-normal">
                          Billed ${priceMonthlyAndYearly.pro.year.price} yearly
                        </div>
                      )}
                    </div>
                  )}
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-center text-md font-bold tracking-wider">
                  Team
                  {index == 0 && (
                    <div className="px-10 text-2xl my-2">
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
                        {yearly && (
                          <div className="text-xs font-normal">
                            Billed $
                            {priceMonthlyAndYearly.enterprise.year.price} yearly
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {featureCategory.list.map((feature, idx) => (
                <tr key={idx}>
                  <td className="py-4 px-6 border-b border-gray-300 text-muted-foreground w-40">
                    {feature.name}
                    {feature.soon && (
                      <span className="text-xs text-red-600 ml-2">Soon</span>
                    )}
                  </td>
                  <td className="py-4 px-6 border-b text-center border-gray-300 font-bold">
                    {renderFeatureValue(feature.free)}
                  </td>
                  <td className="py-4 px-6 border-b text-center border-gray-300 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold w-40">
                    {renderFeatureValue(feature.pro)}
                  </td>
                  <td className="py-4 px-6 border-b  text-center border-gray-300 font-bold">
                    {renderFeatureValue(feature.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PricingFeatureTable;
