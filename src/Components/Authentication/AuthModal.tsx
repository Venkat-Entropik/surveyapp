import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,Button,useDisclosure,UseDisclosureReturn ,Tabs, Text,TabList, TabPanels, Tab, TabPanel,ModalFooter} from '@chakra-ui/react'
import SignPage from './SignPage'
import SignUpPage from './signUpPage'
import GoogleButton from 'react-google-button'

export function AuthModal() {
    const { isOpen, onOpen, onClose }:UseDisclosureReturn = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader alignSelf='center'>Welcome !!!</ModalHeader>
            <ModalCloseButton />
            <Tabs>
                <TabList justifyContent='space-around'>
                
                  <Tab>Login</Tab>
                  <Tab>Sign Up</Tab>
               
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <SignPage />
                  </TabPanel>
                  <TabPanel>
                    <SignUpPage onClose={onClose}/>
                  </TabPanel>
                </TabPanels>
            </Tabs>
            <Text textAlign='center'>OR</Text>
            <ModalFooter>
            <GoogleButton style={{width:'100%',borderRadius:'10px',overflow:'hidden'}}/>
          </ModalFooter>
          </ModalContent>
          
        </Modal>
      </>
    )
  }