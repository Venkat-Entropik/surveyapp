import React, {  useRef,useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Text,
  SimpleGrid,
  Image,
  Flex,
  useToast
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb, textDb } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";


interface id {
  id: string;
  user: any;
}

export const DrawerComponent: React.FC<id> = ({ id, user }) => {
  const toast = useToast()
  // const [imagesArray, setImagesArray] = useState<string[]>([]);
  const imagesArrayRef = useRef<string[]>([]);
  // const[isLoading,setIsLoading]=useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const selector = useSelector((state: any) => {
    return state.images;
  });

  const singleCardData = selector.filter((prod: any) => {
    return prod.id === id;
  });

  const imagesContainer = Array.from(singleCardData[0].images);

  const handleAddToDataBase = async () => {
    const storageRef = ref(imageDb, "storage");

    try {
      const uploadPromises = imagesContainer.map(async (file: any) => {
        const fileRef = ref(storageRef, `${v4()}_${file.name}`);
        
        try {
          await uploadBytes(fileRef, file);

          const downloadURL = await getDownloadURL(fileRef);

       

          imagesArrayRef.current.push(downloadURL);

          console.log("File uploaded successfully. Download URL:", downloadURL);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      });

      await Promise.all(uploadPromises);
     

      console.log("All files uploaded successfully.");

      const valRef = collection(textDb, "textData");

      const dataToStore = {
        id: singleCardData[0].id,
        title: singleCardData[0].title,
        description: singleCardData[0].description,
        images: imagesArrayRef.current,
      };

      // console.log('imagearray',imagesArray)
      
      
     await addDoc(valRef, dataToStore);

   
    
    } catch (error) {
      console.error("Error uploading files or updating Firestore:", error);
    }
    
  };

  return (
    <>
      <Button
        ref={btnRef}
        w="100%"
        mt="10px"
        colorScheme="teal"
        onClick={onOpen}
      >
        View More
      </Button>
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
              <Button bg="green.600" w="40%" onClick={handleAddToDataBase}>
                Publish
              </Button>
              <Button bg="blue.600" w="40%">
                Analytics
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
