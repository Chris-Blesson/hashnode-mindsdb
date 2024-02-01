import { auth } from "@clerk/nextjs";
import { getAccountDetails } from "../db-handlers/accounts/getAccountDetails";
import { notFound } from "next/navigation";
import HeaderSetter from "../Components/Header/HeaderSetter";
import ListAgents from "./IntegrationsDataFetcher";

const Integrations = async () => {
  const { userId } = auth();
  const accountDetails = await getAccountDetails(userId || "");
  const userPersona = accountDetails.account_type;
  if (userPersona === "candidate") {
    return notFound();
  }
  const crumbs = [
    {
      label: "Integrations",
      href: "/integrations",
    },
  ];
  return (
    <>
      <HeaderSetter title={`Integrations`} />
      <section className="layout pt-5">
        <ListAgents />
      </section>
    </>
  );
};

export default Integrations;
