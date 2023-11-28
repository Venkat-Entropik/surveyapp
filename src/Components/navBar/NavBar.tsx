import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  useToast,
} from "@chakra-ui/react";

import { FiTrendingUp } from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

interface user {
  user: any;
}

const NavBar: React.FC<user> = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const handlelogout = () => {
    signOut(auth);
    toast({
      title: "Logout Successfull",

      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            fontWeight="bolder"
            gap="10px"
            fontSize="20px"
            fontFamily="cursive"
          >
            Data{" "}
            <Flex as="span" alignItems="center" gap="10px" color="red">
              Analytics <FiTrendingUp />
            </Flex>{" "}
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={user?.photoURL} />
                  </MenuButton>
                  <MenuList alignItems={"center"} p="2">
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={user?.photoURL} />
                    </Center>
                    <br />
                    <Center>
                      <p>{user?.displayName || user?.email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Button w="100%" onClick={handlelogout}>
                      Logout
                    </Button>
                  </MenuList>
                </Menu>
              ) : (
                <></>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
