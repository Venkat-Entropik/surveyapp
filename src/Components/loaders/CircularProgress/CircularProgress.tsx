import React from 'react';
import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

const CircularProgressComponent = () => (
    <Box
      width="100%"
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress isIndeterminate color="gray" />
    </Box>
  );

export default CircularProgressComponent;
