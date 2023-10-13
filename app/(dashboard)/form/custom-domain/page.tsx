import TeamBadge from "@/app/custom/components/toolsbar/TeamBadge";
import CustomDomainComponent from "./components/CustomDomain";

const CustomDomainPage = () => {
  return (
    <div>
      <h1 className={"text-4xl font-bold"}>
        Custom Domain
        <TeamBadge />
      </h1>
      <p className={"text-muted-foreground"}>
        Connect your custom domain to your form.
      </p>
      <CustomDomainComponent />
    </div>
  );
};

export default CustomDomainPage;
