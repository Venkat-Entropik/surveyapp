import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  useDisclosure,
  UseDisclosureReturn,
  useToast,
  Tabs,
  Text,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ModalFooter,
} from "@chakra-ui/react";
import SignPage from "./SignPage";
import SignUpPage from "./signUpPage";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "./AuthModal.module.css";

export const AuthModal: FC = () => {
  const { isOpen, onOpen, onClose }: UseDisclosureReturn = useDisclosure();
  const googleProvider = new GoogleAuthProvider();

  const toast = useToast();

  const signInWithGoogle = async (): Promise<any> => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      toast({
        title: "Sign Up Successfull",
        description: `welcome ${response.user.email}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      return response;
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        as="span"
        p="1"
        onClick={onOpen}
        className={styles["authmodal__container"]}
      >
        Login
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="center">Welcome !!!</ModalHeader>
          <ModalCloseButton />
          <Tabs>
            <TabList justifyContent="space-around">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SignPage />
              </TabPanel>
              <TabPanel>
                <SignUpPage onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Box className={styles["authmodal__divider-wrapper"]}>
            <Box className={styles["authmodal__divider-left"]} />
            <Text className={styles["authmodal__divider"]}>OR</Text>
            <Box className={styles["authmodal__divider-right"]} />
          </Box>

          <ModalFooter>
            <GoogleButton
              className={styles["authmodal__google-btn"]}
              onClick={signInWithGoogle}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
