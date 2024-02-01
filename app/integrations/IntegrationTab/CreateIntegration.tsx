import InputField from "@/app/Components/Forms/Fields/InputField";
import { requestWrapper } from "@/lib/requestWrapper";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateIntegration = ({ integrationList }) => {
  const [createIntegration, setCreateIntegration] = useState(false);
  const { register, handleSubmit } = useForm();
  const [loading, setIsLoading] = useState(false);
  const onSubmitHandler = (e) => {
    console.log("values", e);
    setIsLoading(true);
    requestWrapper("integration/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    }).finally(() => {
      setIsLoading(false);
    });
  };
  return (
    <>
      <Button
        onClick={() => {
          setCreateIntegration(true);
        }}
        className={clsx(
          integrationList.length !== 0 && "cursor-not-allowed",
          "mb-5"
        )}
        isDisabled={integrationList.length !== 0}
      >
        Create Integration
      </Button>
      <Modal
        size="2xl"
        backdrop="opaque"
        isOpen={createIntegration}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <form
                  className="flex flex-col gap-y-4"
                  onSubmit={handleSubmit(onSubmitHandler)}
                >
                  <div className="form-wrapper flex flex-col gap-y-6">
                    <InputField
                      type="text"
                      label="App token"
                      register={register("appToken", {
                        required: true,
                      })}
                      isRequired={true}
                      placeholder="Enter your App token"
                    />

                    <InputField
                      type="text"
                      label="Oauth token"
                      register={register("oauthToken", {
                        required: true,
                      })}
                      isRequired={true}
                      placeholder="Enter your OAuth Token"
                    />

                    <InputField
                      type="text"
                      label="Chatbot Name"
                      register={register("chatbotName", {
                        required: true,
                      })}
                      isRequired={true}
                      placeholder="Enter your chatbot name"
                    />
                  </div>
                  <div className="footer flex justify-end">
                    <Button
                      type="submit"
                      isLoading={loading}
                      isDisabled={loading}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateIntegration;
