import React, { useState } from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Select,
  useDisclosure,
  Collapse,
  Button,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CardComponent from "./Card";
import Spinners from "../loaders/Spinners";
import SurveyCard from "./SurveyCard";
import NoDataComp from "./NoDataComp";
import { CiFilter } from "react-icons/ci";
import CustomTooltip from "../../Design/Atoms/Tooltip/Tooltip";
import CustomInput from "../../Design/Atoms/Input/CustomInput";
import CustomButton from "../../Design/Atoms/Button/CustomButton";
import LottieGif from "../../Design/Molecules/LottieGif/LottieGif";
import { Link } from "react-router-dom";
import { FaCamera, FaVideo } from "react-icons/fa";
import { RiSurveyFill } from "react-icons/ri";
import CustomAlertDilog from "../../Design/Atoms/DilogAlert/CustomAlertDilog";

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
  const surveyTypes = [
    { name: "Images", image: <FaCamera /> },
    { name: "Videos", image: <FaVideo /> },
    { name: "Survey", image: <RiSurveyFill /> },
  ];

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
                <CustomInput
                  placeholder="Enter Name of the study"
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
              <CustomButton mr="8px" bg="red.400" onClick={handleClearFilter}>
                Clear filter
              </CustomButton>
              <CustomButton bg="green.400" onClick={handleApplyFilter}>
                Apply Filter
              </CustomButton>
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
        <Flex
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <LottieGif
            width={["100%", "50%", "40%"]}
            height="40%"
            lottieGifType="empty-state"
            showDescription={true}
            description="No Data Available"
          />
          <Box>
            <Text margin="0px 0px 8px 40px">Create from scratch</Text>
            <HStack ml="70px">
              {surveyTypes.map((key) => {
                return (
                  <Link key={key.name} to={key.name}>
                    <CustomTooltip label={key.name} placement="bottom">
                      <Box w="30px" height="30px" color="#9333ea">
                        {key.image}
                      </Box>
                    </CustomTooltip>
                  </Link>
                );
              })}
            </HStack>
          </Box>
        </Flex>
      )}
      <CustomAlertDilog/>
    </Box>
  );
};

export default Home;
