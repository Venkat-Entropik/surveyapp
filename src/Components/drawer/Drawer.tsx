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
  SimpleGrid,
  Image,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb, textDb } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import CustomButton from "../../Design/Atoms/Button/CustomButton";
import { showAlertDilog } from "../../features/redux/CommonDataSlice";

interface id {
  id: string;
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerComponent: React.FC<id> = ({
  id,
  user,
  isLoading,
  setIsLoading,
}) => {
  const toast = useToast();
  const dispatch = useDispatch()

  const imagesArrayRef = useRef<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const selector = useSelector((state: any) => {
    return state.data.images;
  });

  const singleCardData = selector.filter((prod: any) => {
    return prod.id === id;
  });

  const imagesContainer = Array.from(singleCardData[0].images);

  const handleAddToDataBase = async () => {
    setIsLoading(true);
    const storageRef = ref(imageDb, "storage");

    try {
      const uploadPromises = imagesContainer.map(async (file: any) => {
        const fileRef = ref(storageRef, `${v4()}_${file.name}`);

        try {
          await uploadBytes(fileRef, file);

          const downloadURL = await getDownloadURL(fileRef);

          imagesArrayRef.current.push(downloadURL);
        } catch (error) {
          toast({
            title: `${error}`,
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      });

      await Promise.all(uploadPromises);

      const valRef = collection(textDb, "textData");

      const dataToStore = {
        id: singleCardData[0].id,
        title: singleCardData[0].title,
        description: singleCardData[0].description,
        images: imagesArrayRef.current,
        type: singleCardData[0].type,
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

    dispatch(showAlertDilog(true))
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
              <Text>Title :{singleCardData[0]?.title}</Text>
              <Text>Description : {singleCardData[0]?.description}</Text>
            </Box>
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(100px, 1fr)"
            >
              {imagesContainer?.map((item: unknown) => {
                if (item instanceof File) {
                  if (item.type.includes("image")) {
                    return (
                      <Image
                        src={URL.createObjectURL(item)}
                        h="100px"
                        w="100%"
                        alt="singleImage"
                        borderRadius="10px"
                      />
                    );
                  } else {
                    return (
                      <video
                        controls
                        width="100%"
                        height="200px"
                        style={{ borderRadius: "10px" }}
                      >
                        <source src={URL.createObjectURL(item)} />
                      </video>
                    );
                  }
                }
              })}
            </SimpleGrid>
            <Flex mt="10px" justifyContent="space-between">
              <CustomButton bg="green.600" w="40%" onClick={handleAddToDataBase}>
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
