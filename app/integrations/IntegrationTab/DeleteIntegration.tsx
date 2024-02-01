import { requestWrapper } from "@/lib/requestWrapper";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const DeleteIntegration = ({ chatbotName }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [integrationDeleted, setIntegrationDeleted] = useState(false);
  const deleteHandler = () => {
    setIsLoading(true);
    requestWrapper("integration/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatbotName }),
    })
      .then(() => {
        setIntegrationDeleted(true);
        window?.location?.reload();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <button
        onClick={() => {
          onOpen();
        }}
      >
        <MdDeleteForever size={25} />
      </button>
      <Modal
        size="2xl"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Delete Integration
              </ModalHeader>
              <ModalBody>
                {integrationDeleted ? (
                  <p>Integration deleted successfully</p>
                ) : (
                  <p>Are you sure you want to delete the integration?</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color={integrationDeleted ? "default" : "danger"}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  onPress={() => {
                    integrationDeleted ? onClose() : deleteHandler();
                  }}
                >
                  {integrationDeleted ? "Close" : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteIntegration;
