import { Flex,Heading,VStack,Text } from '@chakra-ui/react'
import React from 'react'
import { AuthModal } from '../../Authentication/AuthModal'
import { PiHandWavingFill } from "react-icons/pi";


const WelcomePage = () => {
  return (
    <Flex justifyContent='center' alignItems='center' textAlign='center' w='100%' h='90%'>
      <VStack>
        <Heading display='flex' alignItems='center'   fontSize={['2xl', '2xl', '5xl']} gap='10px'><PiHandWavingFill/> Welcome to our website</Heading>
        <Text fontWeight='bold' fontSize='20px'>Please <AuthModal/> to continue</Text>
      </VStack>
    </Flex>
  )
}

export default WelcomePage
