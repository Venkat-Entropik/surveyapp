import React from 'react'
import {  Card,Text,Heading,Image} from '@chakra-ui/react'
import { DrawerComponent } from '../Drawer/Drawer'

const CardComponent = ({selector}:any) => {
    console.log('card',selector)
    const imageName = selector?.images?.[0]
  const image = imageName ? URL.createObjectURL(imageName) : ''
  
  return (
    <>
        <Card p='10px'>
            <Image
                  objectFit='cover'
                src={image} alt='Chakra UI'
                height='100px'
                borderRadius='10px'
            />
            <Heading size='sm' mt='10px'>{selector?.title}</Heading>
            <Text pt='5px'>{selector?.description}</Text>


            <DrawerComponent id={selector?.id}/>
      
        </Card>
    </>
  )
}

export default CardComponent
