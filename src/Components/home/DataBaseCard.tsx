import React from "react";
import {
  Card,
  Text,
  Heading,
  AspectRatio,
  Button,
  useToast,
} from "@chakra-ui/react";
import AnalyticsDrawer from "../drawer/AnalyticsDrawer";
import { deleteDoc, doc } from "firebase/firestore";
import { textDb } from "../../firebase";
import Spinners from "../loaders/Spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface DatabaseCard {
  selector: any;
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDatabaseData: React.Dispatch<React.SetStateAction<any[]>>;
  databaseData: any[];
  setDeleteCard?: any;
}
const DataBaseCard: React.FC<DatabaseCard> = ({
  selector,
  user,
  isLoading,
  setIsLoading,
  setDatabaseData,
  databaseData,
  setDeleteCard,
}) => {
  const analyticsBtn = selector.hasOwnProperty("analytics");
  const dataBase = selector.hasOwnProperty("database");
  const toast = useToast();
  const handleRemove = async (id: string) => {
    setDeleteCard(true);
    try {
      await deleteDoc(doc(textDb, "textData", id));
      setDatabaseData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      toast({
        title: "Error",
        description: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDeleteCard(false);
      toast({
        title: "Removed Task successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      {isLoading && Spinners}
      <Card p="10px">
        {selector.type === "images" ? (
          <LazyLoadImage
            alt="chakra ui"
            height="100px"
            src={selector?.images[0]}
            effect="blur"
            wrapperProps={{
              style: {
                transitionDelay: "1s",
              },
            }}
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

        {dataBase && (
          <Button mt="5px" onClick={() => handleRemove(selector.id)}>
            Remove Task
          </Button>
        )}
        {analyticsBtn && (
          <AnalyticsDrawer
            id={selector.id}
            selector={selector}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </Card>
    </>
  );
};

export default DataBaseCard;
