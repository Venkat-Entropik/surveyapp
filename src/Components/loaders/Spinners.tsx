import React from "react";
import { Spinner,Stack } from '@chakra-ui/react'
const Spinners = () => {
  return (
    <Stack direction="row" spacing={4}>
      <Spinner
        size="md"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
      />
      <Spinner
        size="md"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="red.500"
      />
      <Spinner
        size="md"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.500"
      />
      <Spinner
        size="md"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="yellow.500"
      />
    </Stack>
  );
};

export default Spinners;
