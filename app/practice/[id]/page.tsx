import { practiceDetails } from "@/app/constants/practice";
import { notFound } from "next/navigation";
import PracticeDescription from "./PracticeDescription";
import PracticeSolution from "./PracticeSolution";
import HeaderSetter from "@/app/Components/Header/HeaderSetter";
import SubHeader from "@/app/Components/SubHeader";
import BreadCrumb from "@/app/Components/BreadCrumb";

const PracticeDetailsPage = async ({ params }: { params: { id: string } }) => {
  const practiceDetailsContent = practiceDetails[params.id];
  if (!practiceDetailsContent) {
    return notFound();
  }
  const crumbs = [
    {
      label: "Practice",
      href: "/practice",
    },
    {
      label: params.id,
      href: `/practice/${params.id}`,
    },
  ];
  return (
    <>
      <HeaderSetter title={`Practice: ${params.id}`} />
      <SubHeader>
        <BreadCrumb crumbs={crumbs} />
      </SubHeader>
      <section className="layout">
        <PracticeDescription {...practiceDetailsContent} />
        <PracticeSolution {...practiceDetailsContent} practiceId={params.id} />
      </section>
    </>
  );
};

export default PracticeDetailsPage;
