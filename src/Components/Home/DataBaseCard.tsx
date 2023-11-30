import React from "react";
import { Card, Text, Heading, Image, AspectRatio } from "@chakra-ui/react";

interface DatabaseCard {
  selector: any;
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const DataBaseCard: React.FC<DatabaseCard> = ({
  selector,
  user,
  isLoading,
  setIsLoading,
}) => {

console.log(selector?.images[0])
  return (
    <>
      <Card p="10px">
        {selector.type === "images" ? (
          <Image
            objectFit="cover"
            src={selector?.images[0]}
            alt="Chakra UI"
            height="100px"
            borderRadius="10px"
          />
        ) : (
          <>
            <AspectRatio w="100%" h="100px">
              <video controls>
                <source src={selector?.images[0]} />
              </video>
            </AspectRatio>
          </>
        )}
        <Heading size="sm" mt="10px">
          {selector?.title}
        </Heading>
        <Text pt="5px">{selector?.description}</Text>
      </Card>
    </>
  );
};

export default DataBaseCard;
