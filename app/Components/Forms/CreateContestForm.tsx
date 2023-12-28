"use client";
import FormLayout from "./FormLayout";
import { Controller, FieldValues, UseFormRegister } from "react-hook-form";
import SingleSelect from "./Fields/SingleSelect";
import InputField from "./Fields/InputField";
import DescriptionField from "./Fields/DescriptionField";
import { toast } from "react-toastify";
import { requestWrapper } from "@/lib/requestWrapper";
import Toast from "../Toasts/Toast";
import { useRouter } from "next/navigation";
import RichTextEditor from "../Editor/RichTextEditor";

/**
 * Form Fields
 * Contest Id - Auto Generated, Disabled
 * Title
 * Contest description
 * Category [Sales, Customer support, marketing ,product associate]
 * Start Date
 * End Date
 * Questions
 * Organisation Id - hidden
 * status - yet to start
 * Job Description
 */

export const CATEGORY_DATA = [
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "customer_support" },
  { label: "Marketing", value: "marketing" },
  { label: "Product Associate", value: "product_associate" },
  { label: "User Engineer", value: "user_engineer" },
  { label: "Demo Engineer", value: "demo_engineer" },
];

const ContestForm = (register: UseFormRegister<FieldValues>, control: any) => {
  return (
    <div className="form-wrapper flex flex-col gap-y-8">
      <InputField
        type="text"
        value={`CN-${Math.round(Math.random() * 1000000)}`}
        label="Challenge Id"
        register={register("id", {
          required: true,
        })}
      />
      <InputField
        register={register("title", {
          required: true,
        })}
        isRequired={true}
        label="Title"
        placeholder="Enter your contest title"
      />
      <div className="date-wrapper flex items-center gap-x-4">
        <InputField
          register={register("start_date", {
            required: true,
          })}
          isRequired={true}
          type="date"
          label="Start Date"
          placeholder="Enter your contest start date"
        />

        <InputField
          register={register("end_date", {
            required: true,
          })}
          isRequired={true}
          type="date"
          label="End Date"
          placeholder="Enter your contest end date"
        />
      </div>
      <Controller
        name="description"
        rules={{ required: true }}
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <RichTextEditor
              proFeature
              useForm={true}
              label="Description"
              isRequired
              placeholder="Enter the contest description"
              fieldName="description"
              field={field}
            />
          );
        }}
      />
      <InputField
        register={register("role", {
          required: true,
        })}
        isRequired={true}
        label="Role"
        placeholder="Enter the role you are hiring"
      />
      <Controller
        name="job_description"
        rules={{ required: true }}
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <RichTextEditor
              proFeature
              useForm={true}
              label="Job Description"
              isRequired
              placeholder="Enter the job requirements"
              fieldName="job_description"
              field={field}
            />
          );
        }}
      />
      <SingleSelect
        isRequired={true}
        register={register("category", {
          required: true,
        })}
        label="Category"
        data={CATEGORY_DATA}
      />
      <DescriptionField
        isRequired={true}
        register={register("questions", {
          required: true,
        })}
        label="Questions"
        placeholder="Enter your questions"
      />
      <InputField
        register={register("organisation_id")}
        className="hidden"
        isRequired={true}
        type="text"
        label="Organisation"
        value={"1"}
        placeholder="Enter your organisation id"
      />
      <InputField
        register={register("status")}
        className="hidden"
        isRequired={true}
        label="Status"
        value={"yet_to_start"}
        placeholder="Enter contest status"
      />
    </div>
  );
};
const CreateContestForm = () => {
  const router = useRouter();
  const onSubmitHandler = async (data: any) => {
    try {
      await requestWrapper("contest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Contest created successfuly");
      router.push("/contests");
    } catch {
      toast.error("Unable to create Contest!");
    }
  };
  return (
    <>
      <FormLayout
        formTitle="Create Contest"
        submitHandler={onSubmitHandler}
        form={ContestForm}
        infoContent={<>Test2</>}
      />
      <Toast />
    </>
  );
};

export default CreateContestForm;
