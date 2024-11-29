import { Box, Flex, Select, SimpleGrid } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { textDb } from "../../firebase";
import Spinners from "../loaders/Spinners";
import DataBaseCard from "../home/DataBaseCard";
import SurveyCard from "../home/SurveyCard";
import SkeletonComp from "../../Common/Skeleton/SkeletonComp";
import NoDataComp from "../home/NoDataComp";
import LottieGif from "../../Design/Molecules/LottieGif/LottieGif";

interface DatabaseType {
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Database: React.FC<DatabaseType> = ({
  user,
  isLoading,
  setIsLoading,
}) => {
  const [dropdown, setDropDown] = useState<string>("images");
  const [databaseData, setDatabaseData] = useState<any[]>([]);
  const [deleteCard, setDeleteCard] = useState(false as boolean);
  const getDataFromDatabase = async () => {
    setIsLoading(true);
    try {
      const valRef = collection(textDb, "textData");
      const dataDB = await getDocs(valRef);
      const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
      setDatabaseData(allData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDataFromDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterTasks = databaseData.filter((task) => {
    return (
      dropdown.toLowerCase() === task.type.toLowerCase() &&
      dropdown.toLowerCase() !== "surveys"
    );
  });

  const surveySelector = databaseData.filter((survey) => {
    return (
      dropdown.toLowerCase() === survey.type.toLowerCase() &&
      dropdown.toLowerCase() === "surveys"
    );
  });
  return (
    <Box>
      <Select
        placeholder="Select option"
        w={["50%", "40%", "30%"]}
        onChange={(e) => setDropDown(e.target.value || "images")}
      >
        <option value="images">Images</option>
        <option value="videos">Videos</option>
        <option value="surveys">Survey</option>
      </Select>
      {deleteCard ? (
        <Spinners />
      ) : (
        isLoading && (
          <SimpleGrid
            spacing={4}
            mt="15px"
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            maxH="400px"
            overflowY="auto"
          >
            {Array(40)
              .fill(0)
              .map((_, index: number) => {
                return <SkeletonComp key={index} />;
              })}
          </SimpleGrid>
        )
      )}
      {dropdown === "surveys" ? (
        <>
          {surveySelector.length > 0 ? (
            <SimpleGrid
              spacing={4}
              mt="15px"
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              maxH="400px"
              overflowY="auto"
            >
              {surveySelector.map((survey: any) => (
                <SurveyCard
                  key={survey.id}
                  user={user}
                  selector={survey}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setDatabaseData={setDatabaseData}
                  setDeleteCard={setDeleteCard}
                />
              ))}
            </SimpleGrid>
          ) : (
            !isLoading && (
              <Flex justifyContent="center">
                <LottieGif
                  width={["100%", "50%", "40%"]}
                  height="40%"
                  lottieGifType="empty-state"
                  showDescription={true}
                  description="No Data Available"
                />
              </Flex>
            )
          )}
        </>
      ) : (
        <>
          {filterTasks.length > 0 ? (
            <SimpleGrid
              spacing={4}
              mt="15px"
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              maxH="600px"
              overflowY="auto"
            >
              {filterTasks.map((prod: any) => (
                <DataBaseCard
                  selector={prod}
                  key={prod.id}
                  user={user}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setDatabaseData={setDatabaseData}
                  databaseData={databaseData}
                  setDeleteCard={setDeleteCard}
                />
              ))}
            </SimpleGrid>
          ) : (
            !isLoading && (
              <Flex justifyContent="center">
                <LottieGif
                  width={["100%", "50%", "40%"]}
                  height="40%"
                  lottieGifType="empty-state"
                  showDescription={true}
                  description="No Data Available"
                />
              </Flex>
            )
          )}
        </>
      )}
    </Box>
  );
};

export default Database;
