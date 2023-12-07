import { Box, Select, SimpleGrid } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { textDb } from "../../firebase";
import Spinners from "../loaders/Spinners";
import DataBaseCard from "../home/DataBaseCard";
import SurveyCard from "../home/SurveyCard";

interface analatycsType {
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Analytics: React.FC<analatycsType> = ({
  user,
  isLoading,
  setIsLoading,
}) => {
  const [databaseData, setDatabaseData] = useState<any[]>([]);
  const [dropdown, setDropDown] = useState<string>("images");

  const getDataFromDatabase = async () => {
    setIsLoading(true);
    try {
      const valRef = collection(textDb, "analyticsData");
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
        onChange={(e) => setDropDown(e.target.value)}
      >
        <option value="images">Images</option>
        <option value="videos">Videos</option>
        <option value="surveys">Survey</option>
      </Select>
      {isLoading && <Spinners />}
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
                  selector={surveySelector[0]}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              ))}
            </SimpleGrid>
          ) : (
            <></>
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
                />
              ))}
            </SimpleGrid>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};

export default Analytics;
