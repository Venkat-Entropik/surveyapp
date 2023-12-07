import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  Heading,
  SimpleGrid,
  Image,
  Flex,
  VStack,
} from "@chakra-ui/react";

import React, { useRef } from "react";
import ReactPlayer from "react-player";

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

  const handlePlay = (id: string, startTime: string) => {
    if (videoRef.current) {
      videoRef.current.seekTo(parseFloat(startTime));
    }
  };
  const handleStop = (progress: any) => {
    if (progress.playedSeconds >= selector.endTime) {
      if (videoRef.current) {
        videoRef.current.getInternalPlayer().pause();
      }
    }
  };
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} mt="10px">
        View This Block
      </Button>
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
              <SimpleGrid columns={2} spacing={4} mt="25px">
                {selector?.images?.map((img: string, index: number) =>
                  selector?.type.includes("image") ? (
                    <>
                      <Image
                        src={img}
                        h="150px"
                        w="100%"
                        alt="singleImage"
                        objectFit="cover"
                        borderRadius="10px"
                      />
                    </>
                  ) : (
                    <VStack justifyContent="center" w="100%">
                      <ReactPlayer
                        ref={videoRef}
                        url={img}
                        controls={true}
                        width="auto"
                        height="auto"
                        onStart={() =>
                          handlePlay(selector.id, selector.startTime)
                        }
                        onProgress={handleStop}
                      />
                      <Text>
                        Video Starts from {selector.startTime} seconds and ends
                        at {selector.endTime} seconds
                      </Text>
                    </VStack>
                  )
                )}
              </SimpleGrid>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AnalyticsDrawer;
