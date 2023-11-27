import React from 'react'
import {  Card,Text,Heading,Image,AspectRatio} from '@chakra-ui/react'
import { DrawerComponent } from '../Drawer/Drawer'


interface user{
  selector:any,
  user:any
}
const CardComponent:React.FC<user> = ({selector,user}) => {

    const imageName = selector?.images?.[0]
  const image = imageName ? URL.createObjectURL(imageName) : ''
  
  return (
    <>
        <Card p='10px'>
           {
            selector.type === 'images' ? ( <Image
              objectFit='cover'
            src={image} alt='Chakra UI'
            height='100px'
            borderRadius='10px'
        />) :(<>
        <AspectRatio w='100%' h='100px'>
          <video controls>
          <source src={URL.createObjectURL(imageName)} />
          </video>
        </AspectRatio>
        </>)
           }
            <Heading size='sm' mt='10px'>{selector?.title}</Heading>
            <Text pt='5px'>{selector?.description}</Text>


            <DrawerComponent id={selector?.id} user={user}/>
      
        </Card>
    </>
  )
}

export default CardComponent
