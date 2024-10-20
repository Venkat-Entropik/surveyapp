import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Text,
  Heading,
  SimpleGrid,
  Image,
  Flex,
  VStack,
} from "@chakra-ui/react";

import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import CustomButton from "../../Design/Atoms/Button/CustomButton";

interface dataBase {
  id: string;
  selector: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnalyticsDrawer: React.FC<dataBase> = ({
  id,
  selector,
  isLoading,
  setIsLoading,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [remainingTime, setRemainingTime] = React.useState<number>(
    selector.endTime - selector.startTime,
  );

  const handlePlay = (id: string, startTime: string) => {
    if (videoRef.current) {
      videoRef.current.seekTo(parseFloat(startTime));
    }
    setRemainingTime(selector.endTime - parseFloat(startTime));
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.getInternalPlayer().pause();
    }
    setIsPlaying(false);
  };

  const handleProgress = (progress: any) => {
    if (isPlaying) {
      if (progress.playedSeconds >= selector.endTime) {
        handlePause();
        setIsPlaying(false);
        setRemainingTime(selector.endTime - selector.startTime);
      } else {
        setRemainingTime(selector.endTime - progress.playedSeconds);
      }
    }
  };

  const handleButtonClick = () => {
    setIsPlaying(true);
    handlePlay(selector.id, selector.startTime);
    if (videoRef.current) {
      videoRef.current.getInternalPlayer().play();
    }
  };

  return (
    <>
      <CustomButton ref={btnRef} colorScheme="teal" onClick={onOpen} mt="10px">
        View This Block
      </CustomButton>
      <Drawer onClose={onClose} isOpen={isOpen} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Box textAlign="center" mt="40px">
              <Heading as="h3" size="lg">
                <Box as="span" color="red">
                  Title
                </Box>{" "}
                : {selector.title}
              </Heading>
              <Text mt="10px">
                <Box as="span" color="red" fontWeight="bold">
                  Description
                </Box>{" "}
                : {selector.description}
              </Text>
            </Box>
            <Flex justifyContent="center" w="100%">
              {selector.type.includes("image") && (
                <SimpleGrid columns={2} spacing={4} mt="25px">
                  {selector?.images?.map((img: string, index: number) => (
                    <Image
                      key={index}
                      src={img}
                      h="150px"
                      w="100%"
                      alt="singleImage"
                      objectFit="cover"
                      borderRadius="10px"
                    />
                  ))}
                </SimpleGrid>
              )}
              {selector.type.includes("video") && (
                <VStack justifyContent="center" w="100%">
                  {selector?.images?.map((img: string, index: number) => (
                    <ReactPlayer
                      key={index}
                      ref={videoRef}
                      url={img}
                      width="auto"
                      height="auto"
                      style={{ marginTop: "10px", borderRadius: "10px" }}
                      onStart={() =>
                        handlePlay(selector.id, selector.startTime)
                      }
                      onProgress={handleProgress}
                    />
                  ))}

                  <Text>
                    Video Starts from {selector.startTime} seconds and ends at{" "}
                    {selector.endTime} seconds
                  </Text>
                  <Text>
                    Remaining Time: {Math.floor(remainingTime)} seconds
                  </Text>
                  <CustomButton
                    colorScheme="teal"
                    onClick={handleButtonClick}
                    mt="10px"
                    isDisabled={isPlaying}
                  >
                    {isPlaying ? "Playing ..." : "Play Video"}
                  </CustomButton>
                </VStack>
              )}
            </Flex>
            {selector.type.includes("survey") && (
              <>
                {selector.questions.map((que: any, index: string) => {
                  return (
                    <Box key={index} mt="10px" overflowY="auto">
                      <Heading as="h4" size="md" color="blue.600">
                        {index + 1}.{" "}
                        {que.text.charAt(0).toUpperCase() + que.text.slice(1)}{" "}
                        {"?"}
                      </Heading>
                      <Box
                        border="1px"
                        borderColor="gray.200"
                        rounded="md"
                        mt="5px"
                        bg="inherit"
                        p="5px"
                      >
                        <Text fontWeight="bolder">
                          {" "}
                          Ans : {selector.answers[index]}
                        </Text>
                      </Box>
                    </Box>
                  );
                })}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AnalyticsDrawer;
