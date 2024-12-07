import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import styles from "./CustomAlertDilog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showAlertDilog } from "../../../features/redux/CommonDataSlice";

const CustomAlertDilog = () => {
  const selector = useSelector((state: any) => {
    return state.common.showDilog;
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [isCoppied, setisCoppied] = useState(false);
  const dispatch = useDispatch();

  console.log("selector", selector);
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://testerview.vercel.app/");
    setisCoppied(true);
    setTimeout(() => {
      setisCoppied(false);
    }, 3000);
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={selector}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Please take test</AlertDialogHeader>
          <AlertDialogCloseButton
            onClick={() => dispatch(showAlertDilog(false))}
          />
          <AlertDialogBody className={styles["copy_text"]}>
            https://testerview.vercel.app/
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => dispatch(showAlertDilog(false))}
            >
              Close
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleCopyLink}>
              {isCoppied ? "Coppied" : "Copy"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomAlertDilog;
