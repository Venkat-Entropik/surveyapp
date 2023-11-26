import React from 'react'
import { Box , Flex, Img, SimpleGrid, VStack,Text} from '@chakra-ui/react'
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import CardComponent from './Card';
const Home = () => {
  const selector=useSelector((state:any)=>{
  return state.images
    
  })
  console.log("selector",selector);
  

  
  // console.log('image',imageName);
  
  return (
    <Box>
      
   
    
      {
        selector.length > 0 ? ( 
          <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          {
          selector.map((prod:any)=>{
          return <CardComponent selector={prod} key={prod.id}/>
        })}
      
        </SimpleGrid>
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <VStack>
          <Img w='300px' h='300px' src='https://www.chopserve.com/assets/animation_nofound-b0584b837b2c320b19b87eaa0ee18fb427a627ee601bc5472eeb13463fde3c32.gif' alt='image'/>
            <Text fontWeight='bold'>No Data Available <Link to='Images'><Box as='span' color='blue.500'>Upload Images</Box></Link></Text>
          </VStack>
          </Flex>
        )
       
      }

    </Box>
  )
}

export default Home
