import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";

import { FaCloudUploadAlt } from "react-icons/fa";
import { addImages } from "../features/redux/dataSlice";

export interface dataType {
  id: string;
  title: string;
  description: string;
  images: any;
}

const FileUpload: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  console.log(fileNames)
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);

    if (files && files.length > 0) {
      if (files.length > 4) {
        toast({
          title: "You can only select up to 4 images.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        e.target.value = "";
        setImageUploaded(false);
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      for (let i = 0; i < files.length; i++) {
        if (!allowedTypes.includes(files[i].type)) {
          toast({
            title: "Please select only image files (JPEG, PNG, GIF).",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          e.target.value = "";
          setImageUploaded(false);
          setFileNames([])
          return;
        }
        // console.log(files[i].name);
        setFileNames([...fileNames,files[i].name])
      }

      setImageUploaded(true);
    }
  };

  const handleSubmit = () => {
    if (title.trim() === "") {
      toast({
        title: "Title should not be empty",
        description: "Enter Title",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (description.trim() === "") {
      toast({
        title: "Description should not be empty",
        description: "Enter Description",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!imageUploaded) {
      toast({
        title: "Upload Image",
        description: "Images Not Uploaded",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const data: dataType = {
      id: new Date().getTime().toString(),
      title: title,
      description: description,
      images: selectedFiles,
    };

    dispatch(addImages(data));

    toast({
      title: "Images Uploaded Successfully",
      description: "Please check in home page",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6} borderWidth={3} borderRadius="md" borderColor="blue.500">
      <Flex flexDirection={["column", "column", "row"]} justify="space-around">
        <Stack spacing={4} align="center">
          <FaCloudUploadAlt fontSize="2em" color="gray.500" />
          <Heading as="h3" size="md">
            Upload Files
          </Heading>
          <Input
            type="file"
            id="fileInput"
            display="none"
            onChange={(e) => handleImages(e)}
            multiple
            accept="image/jpeg, image/png, image/gif"
          />
          <label htmlFor="fileInput">
            <Box
              as="span"
              cursor="pointer"
              borderWidth={1}
              borderRadius="md"
              p={2}
              borderColor="blue.500"
              _hover={{ color: "black", bg: "white", fontWeight: "600" }}
            >
              Choose a file
            </Box>
          </label>
          <Text fontSize="sm" color="gray.500">
             { fileNames.length === 0 ? "No Files Uploaded" : fileNames.toString()}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Supported file types: JPG, JPEG, PNG.
          </Text>
        </Stack>
        <Stack>
          <FormControl>
            <FormLabel>Enter Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormLabel mt="5px">Enter Description</FormLabel>
            <Textarea
              placeholder="Enter Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Textarea>
            <Button w="100%" mt="10px" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </Stack>
      </Flex>
    </Box>
  );
};

export default FileUpload;
