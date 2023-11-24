
import {
  Box,Flex,Avatar,Button,Menu,MenuButton,MenuList,MenuDivider,useColorModeValue,Stack,useColorMode,Center
} from '@chakra-ui/react'

import {FiTrendingUp} from 'react-icons/fi'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'


export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex fontWeight='bolder' gap='10px' fontSize='20px' fontFamily='cursive'>Data <Flex as='span' alignItems='center' gap='10px' color='red'>Analytics <FiTrendingUp /></Flex> </Flex>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'} p='2'>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <Button w='100%'>Logout</Button>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}