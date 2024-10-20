import React, { useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { textDb } from "../../firebase";
import { Link } from "react-router-dom";
import CustomButton from "../../Design/Atoms/Button/CustomButton";

interface survey {
  id: string;
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SurveyDrawer: React.FC<survey> = ({
  id,
  user,
  isLoading,
  setIsLoading,
}) => {
  const selector = useSelector((state: any) => {
    return state.survey.surveys;
  });
  const toast = useToast();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredSurveys = selector.filter((survey: any) => {
    return survey.id === id;
  });

  const handleUploadSurvey = async () => {
    try {
      setIsLoading(true);
      const valRef = collection(textDb, "textData");
      const dataToStore = {
        id: filteredSurveys[0].id,
        title: filteredSurveys[0].title,
        description: filteredSurveys[0].description,
        questions: filteredSurveys[0].questions,
        type: "surveys",
        database: true,
      };
      await addDoc(valRef, dataToStore);
    } catch (error) {
      toast({
        title: `${error}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    toast({
      title: `successfully uploaded files`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <CustomButton
        ref={btnRef}
        w="100%"
        mt="10px"
        colorScheme="teal"
        onClick={onOpen}
      >
        View More
      </CustomButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt="50px">
            <Box textAlign="center" mb="15px">
              <Text>Title :{filteredSurveys[0]?.title}</Text>
              <Text>Description : {filteredSurveys[0]?.description}</Text>
            </Box>
            <Flex mt="10px" justifyContent="space-between">
              <CustomButton bg="green.600" w="40%" onClick={handleUploadSurvey}>
                Publish
              </CustomButton>
              <Link
                to="Analytics"
                style={{
                  background: "skyblue",
                  width: "40%",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                <CustomButton>Analytics</CustomButton>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
