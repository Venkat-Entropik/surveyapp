import React, { useState } from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Select,
  useDisclosure,
  Button,
  Collapse,
  Input,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CardComponent from "./Card";
import Spinners from "../loaders/Spinners";
import SurveyCard from "./SurveyCard";
import NoDataComp from "./NoDataComp";
import { CiFilter } from "react-icons/ci";
import CustomTooltip from "../../Design/Atoms/Tooltip/Tooltip";

interface UserProps {
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface filterProps {
  type: string;
  key: string;
}

const Home: React.FC<UserProps> = ({ user, isLoading, setIsLoading }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [dropdown, setDropDown] = useState<string>("name");
  const [filterValue, setFilterValue] = useState<filterProps>({
    type: "",
    key: "",
  });
  const [inputValue, setInputValue] = useState<string>("");
  const [filterDropDown, setFilterDropDown] = useState("");
  const selector = useSelector((state: any) => {
    return state.data.images;
  });

  const surveySelector = useSelector((state: any) => {
    return state.survey.surveys;
  });

  const filterTasks = selector.filter((task: any) => {
    return task.type.toLowerCase() === dropdown.toLowerCase();
  });

  const allStudies = [...selector, ...surveySelector].filter((item, index) => {
    return filterValue.type === "name"
      ? item.title.toLowerCase().includes(filterValue.key.toLowerCase())
      : filterValue.type === "type"
        ? item.type === filterValue.key
        : item;
  });

  console.log("allstudies", allStudies);

  const filterTypes = [
    {
      label: "Name",
      value: "name",
    },
    {
      label: "Study Type",
      value: "type",
    },
  ];

  const handleApplyFilter = () => {
    if (dropdown === "name") {
      setFilterValue({
        type: "name",
        key: inputValue,
      });
    } else {
      setFilterValue({
        type: "type",
        key: filterDropDown,
      });
    }
  };

  const handleClearFilter = () => {
    setFilterValue({
      type: "",
      key: "",
    });
    setInputValue("");
    setFilterDropDown("images");
  };

  return (
    <Box>
      <>
        <CustomTooltip
          hasArrow
          label="Filter Cards"
          placement="right"
          bg="gray.300"
          color="black"
        >
          <Button onClick={onToggle} isDisabled={allStudies.length === 0}>
            <CiFilter />
          </Button>
        </CustomTooltip>
        <Collapse in={isOpen} animateOpacity>
          <Box
            p="20px"
            color="white"
            mt="4"
            bg="teal.500"
            rounded="md"
            shadow="md"
            w={["100%", "70%", "70%"]}
            height="120px"
          >
            <Box display="flex" gap="10px">
              <Select
                w="150px"
                onChange={(e) => setDropDown(e.target.value || "name")}
              >
                {filterTypes.map((item, index) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </Select>
              {dropdown === "name" && (
                <Input
                  placeholder="Enter Name of the study"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
              )}
              {dropdown === "type" && (
                <Select
                  onChange={(e) =>
                    setFilterDropDown(e.target.value || "images")
                  }
                >
                  <option value="images">Images</option>
                  <option value="videos">Videos</option>
                  <option value="survey">Survey</option>
                </Select>
              )}
            </Box>
            <Box mt="8px" float="right">
              <Button mr="8px" bg="red.400" onClick={handleClearFilter}>
                Clear filter
              </Button>
              <Button bg="green.400" onClick={handleApplyFilter}>
                Apply Filter
              </Button>
            </Box>
          </Box>
        </Collapse>
      </>
      {isLoading && <Spinners />}
      {allStudies.length > 0 ? (
        <SimpleGrid
          spacing={4}
          mt="15px"
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {allStudies.map((survey: any) =>
            survey.type === "survey" ? (
              <SurveyCard
                key={survey.id}
                user={user}
                selector={survey}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ) : (
              <CardComponent
                key={survey.id}
                selector={survey}
                user={user}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ),
          )}
        </SimpleGrid>
      ) : (
        <Flex justifyContent="center" alignItems="center">
          <NoDataComp dropdown={dropdown} home={true} />
        </Flex>
      )}
    </Box>
  );
};

export default Home;
