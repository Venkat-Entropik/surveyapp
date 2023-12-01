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
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

export const AuthModal: React.FC = () => {
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
      toast({
        title: "Error",
        description: "Error",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        as="span"
        bg="gold"
        p="1"
        borderRadius="5px"
        cursor="pointer"
        color="black"
        onClick={onOpen}
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
          <Text textAlign="center">OR</Text>
          <ModalFooter>
            <GoogleButton
              style={{
                width: "100%",
                borderRadius: "10px",
                overflow: "hidden",
              }}
              onClick={signInWithGoogle}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
