import { Flex,Heading,VStack,Text } from '@chakra-ui/react'
import React from 'react'
import { AuthModal } from '../../Authentication/AuthModal'
import { PiHandWavingFill } from "react-icons/pi";


const WelcomePage = () => {
  return (
    <Flex justifyContent='center' alignItems='center' textAlign='center' w='100%' h='90%'>
      <VStack>
        <Heading display='flex' alignItems='center' gap='10px'><PiHandWavingFill/> Welcome to our website</Heading>
        <Text fontWeight='bold'>Please <AuthModal/> to continue</Text>
      </VStack>
    </Flex>
  )
}

export default WelcomePage
