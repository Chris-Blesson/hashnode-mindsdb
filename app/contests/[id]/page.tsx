import ContestDetails from "../manager/ContestDetails";

import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import SubHeader from "@/app/Components/SubHeader";
import BreadCrumb from "@/app/Components/BreadCrumb";
import { getUserPersona } from "@/app/utils/getUserPersona";
import { auth } from "@clerk/nextjs";
import { getContestDetails } from "@/app/db-handlers/contests/getContestDetails";

const ContestDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { account_type: accountPersona, organisation_id } =
    await getUserPersona();
  const contestDetails = await getContestDetails(
    params.id,
    userId,
    accountPersona,
    [],
    organisation_id
  );
  const crumbs = [
    {
      label: "Contests",
      href: "/contests",
    },
    {
      label: params.id,
      href: `/contests/${params.id}`,
    },
  ];
  return (
    <>
      <HeaderSetter title={`Contest: ${params.id}`} />
      <SubHeader>
        <BreadCrumb crumbs={crumbs} />
      </SubHeader>
      <section className="layout">
        <ContestDetails details={contestDetails} userType={accountPersona} />
      </section>
    </>
  );
};

export default ContestDetailsPage;
