import { auth } from "@clerk/nextjs";
import { getAccountDetails } from "../db-handlers/accounts/getAccountDetails";
import { notFound } from "next/navigation";
import HeaderSetter from "../Components/Header/HeaderSetter";
import BreadCrumb from "../Components/BreadCrumb";
import SubHeader from "../Components/SubHeader";
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
      <SubHeader>
        <BreadCrumb crumbs={crumbs} />
      </SubHeader>
      <section className="layout">
        <ListAgents />
      </section>
    </>
  );
};

export default Integrations;
