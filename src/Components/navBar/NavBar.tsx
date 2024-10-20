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
  Center,
  useToast,
} from "@chakra-ui/react";

import { FiTrendingUp } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import React, { useEffect } from "react";
import CustomButton from "../../Design/Atoms/Button/CustomButton";
interface user {
  user: any;
}

const NavBar: React.FC<user> = ({ user }) => {
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

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

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
              Analytics <FiTrendingUp data-testid="logo" />
            </Flex>{" "}
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {user ? (
                <Box data-testid="usericon">
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
                        <p data-testid="paragraph">
                          {user?.displayName || user?.email}
                        </p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <CustomButton w="100%" onClick={handlelogout}>
                        Logout
                      </CustomButton>
                    </MenuList>
                  </Menu>
                </Box>
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
