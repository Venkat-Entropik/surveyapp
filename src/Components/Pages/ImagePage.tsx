import { Box, Flex, Heading, Input, Stack, Text, FormControl,FormLabel, Textarea, Button,useToast } from "@chakra-ui/react";
import { FaCloudUploadAlt } from "react-icons/fa";
import React,{useState} from 'react'



const FileUpload:React.FC = () => {
const toast = useToast()

const[title,setTitle]=useState<string>('')
const[description,setDescripion]=useState<string>('')
const [imageUploaded, setImageUploaded] = useState<boolean>(false);

const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    console.log(e.target.files[0]);
    setImageUploaded(true);
  }
};

const handleSubmit=()=>{


 

  if(title.trim() === ''){
    toast({
      title: 'Title should not be empty',
      description: "Enter Title",
      status: 'warning',
      duration: 3000,
      isClosable: true,
    })
    return
  }
  if(description.trim() === ''){
    toast({
      title: 'Description should not be empty',
      description: "Enter Description",
      status: 'warning',
      duration: 3000,
      isClosable: true,
    })
    return
  }

  if (!imageUploaded) {
    toast({
      title: 'Upload Image',
      description: 'Images Not Uploaded',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
    return;
  }
}

  return (
    <Box p={6} borderWidth={3} borderRadius="md" borderColor='blue.500'>
      <Flex flexDirection={['column','column','row']} justify='space-around'>
      <Stack spacing={4} align="center">
        <FaCloudUploadAlt fontSize="2em" color="gray.500" />
        <Heading as="h3" size="md">
          Upload Files
        </Heading>
        <Input
          type="file"
          id="fileInput"
          display="none" 
          onChange={(e)=>handleImages(e)}
        />
        <label htmlFor="fileInput">
          <Box
            as="span"
            cursor="pointer"
            borderWidth={1}
            borderRadius="md"
            p={2}
            borderColor='blue.500'
            _hover={{ color: "black",bg:'white',fontWeight:'600' }}
          >
            Choose a file
          </Box>
        </label>
        <Text fontSize="sm" color="gray.500">
          Supported file types: JPG, PNG.
        </Text>
      </Stack>
      <Stack>
        <FormControl>
           <FormLabel>Enter Title</FormLabel>
           <Input type='text' placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
           <FormLabel>Enter Description</FormLabel>
           <Textarea placeholder="Enter Description..." value={description} onChange={(e)=>setDescripion(e.target.value)}></Textarea>
           <Button w='100%' mt='10px' onClick={handleSubmit}>Submit</Button>
        </FormControl>
      </Stack> 
      
      </Flex>
    </Box>
  );
};

export default FileUpload;
