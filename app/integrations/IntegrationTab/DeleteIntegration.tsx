import { requestWrapper } from "@/lib/requestWrapper";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const DeleteIntegration = ({ chatbotName }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deleteHandler = () => {
    setIsLoading(true);
    requestWrapper("integration/delete")
      .then(() => {
        setShowDeleteModal(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <button
        onClick={() => {
          setShowDeleteModal(true);
        }}
      >
        <MdDeleteForever size={25} />
      </button>
      <Modal
        size="2xl"
        backdrop="opaque"
        isOpen={showDeleteModal}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <p>Are you sure you want to delete the integration?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  onClick={() => {
                    deleteHandler();
                  }}
                >
                  Delete
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
