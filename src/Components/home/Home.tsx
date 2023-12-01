import React, { useState } from "react";
import { Box, Flex, SimpleGrid, Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CardComponent from "./Card";
import Spinners from "../loaders/Spinners";
import SurveyCard from "./SurveyCard";
import NoDataComp from "./NoDataComp";

interface user {
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<user> = ({ user, isLoading, setIsLoading }) => {
  const [dropdown, setDropDown] = useState<string>("images");
  const selector = useSelector((state: any) => {
    return state.data.images;
  });

  const surveySelector = useSelector((state: any) => {
    return state.survey.surveys;
  });

  const filterTasks = selector.filter((task: any) => {
    return task.type.toLowerCase() === dropdown.toLowerCase();
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
        <option value="survey">Survey</option>
      </Select>
      {isLoading && <Spinners />}
      {dropdown === "survey" ? (
        <>
          {surveySelector.length > 0 ? (
            <SimpleGrid
              spacing={4}
              mt="15px"
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {surveySelector.map((survey: any) => (
                <SurveyCard
                  key={survey.id}
                  user={user}
                  selector={survey}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Flex justifyContent="center" alignItems="center">
              <NoDataComp dropdown={dropdown} />
            </Flex>
          )}
        </>
      ) : (
        <>
          {filterTasks.length > 0 ? (
            <SimpleGrid
              spacing={4}
              mt="15px"
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            >
              {filterTasks.map((prod: any) => (
                <CardComponent
                  selector={prod}
                  key={prod.id}
                  user={user}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Flex justifyContent="center" alignItems="center">
              <NoDataComp dropdown={dropdown} />
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default Home;
