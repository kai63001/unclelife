import { Check } from "lucide-react";

const PricingFeatureTable = () => {
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
          soon: true,
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
      return value ? <Check className="h-6 w-6" /> : "";
    }
    return value;
  };

  return (
    <div className="mx-auto my-8">
      {features.map((featureCategory, index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold mb-4">{featureCategory.name}</h3>
          <table className="min-w-full border-t border-b rounded-lg mb-8">
            <thead>
              <tr>
                <th className="py-4 px-6 border-b border-gray-300 text-left text-md font-bold tracking-wider">
                  Feature
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-left text-md font-bold tracking-wider bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                  Basic
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-left text-md font-bold tracking-wider bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Pro
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-left text-md font-bold tracking-wider bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                  Team
                </th>
              </tr>
            </thead>
            <tbody>
              {featureCategory.list.map((feature, idx) => (
                <tr key={idx}>
                  <td className="py-4 px-6 border-b border-gray-300 text-muted-foreground">
                    {feature.name}
                    {feature.soon && (
                      <span className="text-xs text-red-600 ml-2">Soon</span>
                    )}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300 font-bold">
                    {renderFeatureValue(feature.free)}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300 font-bold">
                    {renderFeatureValue(feature.pro)}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300 font-bold">
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
