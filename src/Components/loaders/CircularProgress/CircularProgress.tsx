import React from "react";
import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const CircularProgressComponent = () => {
  return (
    <Box
      width="100%"
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress isIndeterminate color="gray"></CircularProgress>
    </Box>
  );
};

export default CircularProgressComponent;
