import React from 'react'
import {  Card,Button,Text,Heading,Image} from '@chakra-ui/react'

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

            <Button w='100%' mt='10px'>View here</Button>
        </Card>
    </>
  )
}

export default CardComponent
