import { VStack, Text, Img, Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type dropdown = {
  dropdown: string;
};

const NoDataComp: React.FC<dropdown> = ({ dropdown }) => {
  return (
    <VStack>
      <Img
        w="300px"
        h="300px"
        src="https://www.chopserve.com/assets/animation_nofound-b0584b837b2c320b19b87eaa0ee18fb427a627ee601bc5472eeb13463fde3c32.gif"
        alt="image"
      />
      <Text fontWeight="bold">
        No {`${dropdown}`} Data Available{" "}
        <Link to={`${dropdown}`}>
          <Box as="span" color="blue.500">
            Upload {`${dropdown}`}
          </Box>
        </Link>
      </Text>
    </VStack>
  );
};

export default NoDataComp;
