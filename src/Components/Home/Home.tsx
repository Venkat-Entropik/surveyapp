import React,{useState} from 'react'
import { Box , Flex, Img, SimpleGrid, VStack,Text,Select} from '@chakra-ui/react'
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import CardComponent from './Card';


interface user{
  user:any
}
const Home:React.FC<user> = ({user}) => {

  const[dropdown,setDropDown]=useState<string>('images')
  const selector=useSelector((state:any)=>{
  return state.images
  })

  const filterTasks=selector.filter((task:any)=>{
    // console.log(task);
    
    return task.type.toLowerCase() === dropdown.toLowerCase()
  })
  // console.log(dropdown)
  // console.log(selector);
  
  return (
    <Box>
       <Select placeholder='Select option' w={['50%','40%','30%']} onChange={(e)=>setDropDown(e.target.value)}>
            <option value='images'>Images</option>
            <option value='videos'>Videos</option>
            <option value='survey'>Survey</option>
        </Select>
      {
        filterTasks.length > 0 ? ( 
          <>
          
          <SimpleGrid spacing={4} mt='15px' templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          {
          filterTasks.map((prod:any)=>{
          return <CardComponent selector={prod} key={prod.id} user={user}/>
        })}
      
        </SimpleGrid>
        </>
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
