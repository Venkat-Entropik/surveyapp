import React, { useRef } from 'react';
import {Drawer,DrawerBody,DrawerOverlay,DrawerContent,DrawerCloseButton,Button,useDisclosure,Box,Text,SimpleGrid,Image, Flex,
} from '@chakra-ui/react';

import { useSelector } from "react-redux";
import { db } from '../../firebase';

interface id{
    id:string,
    user:any
}

export const DrawerComponent:React.FC<id>=({id,user})=> {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  
  const selector=useSelector((state:any)=>{
    return state.images
    })

    const singleCardData=selector.filter((prod:any)=>{
        return prod.id === id
    })
    // console.log('single',singleCardData[0].title)

  const imagesContainer=Array.from(singleCardData[0].images)
   
    // console.log('container',imagesContainer);

    const handleAddToDataBase= async ()=>{
      console.log(singleCardData);
      
    }
    
  return (
    <>
      <Button ref={btnRef} w='100%' mt='10px' colorScheme='teal' onClick={onOpen}>
        View More
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt='50px'>
            <Box textAlign='center' mb='15px'>
                <Text>Title :{singleCardData[0]?.title}</Text>
                <Text>Description : {singleCardData[0]?.description}</Text>
            </Box>
            <SimpleGrid spacing={4}  templateColumns='repeat(auto-fill, minmax(100px, 1fr)'>
                    {
                        imagesContainer?.map((item: unknown) => {
                        
                        if (item instanceof File) {

                          if(item.type.includes('image')){
                            return <Image src={URL.createObjectURL(item)} h='100px' w='100%' alt='singleImage' borderRadius='10px'/>;
                          }else{
                            return (<video controls width='100%' height='200px' style={{borderRadius:'10px'}}>
                            <source src={URL.createObjectURL(item)} />
                            </video>)
                          }
                           
                            
                        } 
                        })
                    }
            </SimpleGrid>
            <Flex mt='10px' justifyContent='space-between'>
                <Button bg='green.600' w='40%' onClick={handleAddToDataBase}>Publish</Button>
                <Button bg='blue.600' w='40%'>Analytics</Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}