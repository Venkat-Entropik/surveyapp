import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
interface SignUpPageProps {
  onClose: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onClose }) => {
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Password not mached",
        description: "Enter same password",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast({
        title: "Sign Up Successfull",
        description: `welcome ${result.user.email}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error",
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
        placeholder="Enter Title"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <FormLabel>Enter Password</FormLabel>
      <Input
        type="password"
        placeholder="Enter Title"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormLabel>Confirm Password</FormLabel>
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button w="100%" mt="10px" onClick={handleSubmit}>
        Submit
      </Button>
    </FormControl>
  );
};

export default SignUpPage;
