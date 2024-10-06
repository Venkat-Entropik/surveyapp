import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
interface SignUpPageProps {
  onClose: () => void;
}

interface formValuesProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onClose }) => {
  const toast = useToast();
  const [formValues, setFormValues] = useState<formValuesProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const FormTypes = ["Email", "Password", "Confirm Password"];

  const handleSubmit = async () => {
    if (formValues.password !== formValues.confirmPassword) {
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
        formValues.email,
        formValues.password,
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

  const handleInputChange = (e: any, type: string) => {
    console.log(e.target.value, type);
    if (type === "Email") {
      setFormValues({ ...formValues, email: e.target.value });
    } else if (type === "Password") {
      setFormValues({ ...formValues, password: e.target.value });
    } else if (type === "Confirm Password") {
      setFormValues({ ...formValues, confirmPassword: e.target.value });
    }
  };

  const handleInputValue = (type: string) => {
    if (type === "Email") {
      return formValues.email;
    } else if (type === "Password") {
      return formValues.password;
    }
    return formValues.confirmPassword;
  };

  return (
    <FormControl isRequired>
      {FormTypes.map((type: string) => {
        return (
          <Box key={type}>
            <FormLabel>{`Enter ${type}`}</FormLabel>
            <Input
              type={`${type.toLowerCase()}`}
              placeholder={`Enter ${type}`}
              value={handleInputValue(type)}
              onChange={(e) => handleInputChange(e, type)}
            />
          </Box>
        );
      })}
      <Button w="100%" mt="10px" onClick={handleSubmit}>
        Sign Up
      </Button>
    </FormControl>
  );
};

export default SignUpPage;
