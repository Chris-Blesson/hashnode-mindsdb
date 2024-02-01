import Button from "@/app/Components/Buttons";
import InputField from "@/app/Components/Forms/Fields/InputField";
import Toast from "@/app/Components/Toasts/Toast";
import { requestWrapper } from "@/lib/requestWrapper";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/react";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateIntegration = ({ integrationList }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
    })
      .then(() => {
        onClose();
        toast.success("Integration created successfully");
        setTimeout(() => {
          window?.location.reload();
        }, 100);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Button
        onClick={() => {
          onOpen();
        }}
        className={clsx(
          integrationList.length !== 0 && "cursor-not-allowed",
          "mb-5"
        )}
        color="primary"
        isDisabled={integrationList.length !== 0}
      >
        Create Integration
      </Button>
      <Modal
        size="2xl"
        backdrop="opaque"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Create Slack Integration
              </ModalHeader>
              <ModalBody>
                <Link
                  href="https://docs.mindsdb.com/integrations/app-integrations/slack#method-1-chatbot-responds-in-direct-messages-to-a-slack-app"
                  target="_blank"
                  className="text-blue mb-3"
                >
                  How to create slack app?
                </Link>
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
                  <div className="footer flex justify-end gap-2">
                    <Button
                      isLoading={loading}
                      isDisabled={loading}
                      color="secondary"
                      onPress={() => {
                        onClose();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      isLoading={loading}
                      isDisabled={loading}
                      color="primary"
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
      <Toast />
    </>
  );
};

export default CreateIntegration;
