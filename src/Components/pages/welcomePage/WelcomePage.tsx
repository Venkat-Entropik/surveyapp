import { Flex, Heading, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { AuthModal } from "../../authentication/AuthModal";
import { PiHandWavingFill } from "react-icons/pi";
import styles from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      w="100%"
      h="90%"
    >
      <VStack gap="18px">
        <Heading
          fontSize={["2xl", "2xl", "5xl"]}
          className={styles["type-writer-effect"]}
        >
          <p style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <PiHandWavingFill data-testid="handicon" />
            Welcome to our website
          </p>
        </Heading>
        <Text fontWeight="bold" fontSize="20px">
          Please <AuthModal /> to continue
        </Text>
      </VStack>
    </Flex>
  );
};

export default WelcomePage;
