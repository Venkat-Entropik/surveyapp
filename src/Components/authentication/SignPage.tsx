import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [passowrd, setPassword] = useState<string>("");
  const toast = useToast();
  const handleSubmit = async () => {
    if (!email || !passowrd) {
      toast({
        title: "Email and password does not match",
        description: "Enter valid email and password",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, passowrd);

      toast({
        title: "Login Successfull",
        description: `welcome ${result.user.email}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <FormControl>
      <FormLabel>Enter Email</FormLabel>
      <Input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormLabel>Enter Password</FormLabel>
      <Input
        type="password"
        placeholder="Enter Password"
        value={passowrd}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button w="100%" mt="10px" onClick={handleSubmit}>
        Login
      </Button>
    </FormControl>
  );
};

export default SignPage;
