import { Card, Image, Heading, Text, Button, useToast } from "@chakra-ui/react";
import React from "react";
import img from "../assets/17.jpg";
import { SurveyDrawer } from "../drawer/SurveyDrawer";
import AnalyticsDrawer from "../drawer/AnalyticsDrawer";
import { deleteDoc, doc } from "firebase/firestore";
import { textDb } from "../../firebase";

interface survey {
  selector: any;
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDatabaseData?: any;
  setDeleteCard?: any;
}

const SurveyCard: React.FC<survey> = ({
  selector,
  user,
  isLoading,
  setIsLoading,
  setDatabaseData,
  setDeleteCard,
}) => {
  const drawerHide = selector.hasOwnProperty("database");
  const analyticsDrawer = selector.hasOwnProperty("analytics");
  const toast = useToast();

  const handleRemove = async (id: string) => {
    setDeleteCard(true);
    try {
      await deleteDoc(doc(textDb, "textData", id));
      setDatabaseData((prevData: any) =>
        prevData.filter((item: any) => item.id !== id),
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setDeleteCard(false);
    toast({
      title: "Removed Task successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Card p="10px">
      <Image
        objectFit="cover"
        src={img}
        alt="Chakra UI"
        height="100px"
        borderRadius="10px"
      />

      <Heading size="sm" mt="10px">
        {selector?.title}
      </Heading>
      <Text pt="5px">{selector?.description}</Text>

      {!drawerHide && !analyticsDrawer && (
        <SurveyDrawer
          id={selector?.id}
          user={user}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}

      {drawerHide && (
        <Button mt="5px" onClick={() => handleRemove(selector.id)}>
          Remove Task
        </Button>
      )}

      {analyticsDrawer && (
        <AnalyticsDrawer
          id={selector.id}
          selector={selector}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </Card>
  );
};

export default SurveyCard;
