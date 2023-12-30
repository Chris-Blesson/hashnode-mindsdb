"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";

const FullScreenChecker = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const checkAndOpenFullScreenModal = () => {
    if (!document.fullscreenElement) {
      onOpen();
    }
  };
  const fullScreenEventListener = (e) => {
    console.log("event listener", e);
    checkAndOpenFullScreenModal();
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", fullScreenEventListener);
    checkAndOpenFullScreenModal();
    return () =>
      document.removeEventListener("fullscreenchange", fullScreenEventListener);
  }, []);
  const requestFullscreenAccess = (e) => {
    e.stopPropagation;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      console.log("exiting full screen");
      document.exitFullscreen();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      closeButton={<></>}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Fullscreen mode
            </ModalHeader>
            <ModalBody>
              <p>Please enable fullscreen to continue the contest</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={(e) => {
                  requestFullscreenAccess(e);
                  onClose();
                }}
              >
                Enable
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FullScreenChecker;