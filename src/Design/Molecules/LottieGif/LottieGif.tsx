import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import * as defaultState from "../../../Components/assets/Json/empty-state.json";
import * as emptyState from "../../../Components/assets/Json/empty-state-new.json";

interface LottieGifProps {
  lottieGifType: string;
  width?: any;
  height?: string | number;
  showDescription?: boolean;
  description?: string;
}

const LottieGif: FC<LottieGifProps> = ({
  lottieGifType,
  width = "100%",
  height = "100%",
  showDescription = true,
  description,
}) => {
  const getAnimateData = (type: string) => {
    switch (type) {
      case "empty-state":
        return emptyState;
      default:
        return defaultState;
    }
  };

  return (
    <Box width={width} height={height}>
      <Lottie animationData={getAnimateData(lottieGifType)} loop autoPlay />
      {showDescription && (
        <Text
          width="100%"
          color="white"
          fontFamily="inter"
          fontSize="20px"
          fontWeight="600"
          textAlign="center"
          marginLeft="20px"
        >
          {description}
        </Text>
      )}
    </Box>
  );
};

export default LottieGif;
