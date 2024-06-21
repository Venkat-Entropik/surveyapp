import React, { useCallback, useState } from "react";
import styles from "./SurveyPage.module.css";
import {
  Box,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
  Radio,
  RadioGroup,
  VStack,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { addSurveys } from "../../features/redux/surveySlice";
import { useDispatch } from "react-redux";
import { DeleteIcon } from "@chakra-ui/icons";

interface Question {
  text: string;
  type: "descriptive" | "mcq";
  options?: string[];
}

const SurveyPage: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState<string>("");
  const [questionType, setQuestionType] = useState<"descriptive" | "mcq">(
    "descriptive"
  );
  const [options, setOptions] = useState<string[]>([]);
  const [optionText, setOptionText] = useState<string>("");
  const [surveyTitle, setSurveyTitle] = useState<string>("");
  const [surveyDescription, setSurveyDescription] = useState<string>("");
  const [hoveredQuestion, setHoveredQuestion] = useState<number | string>("");
  const addQuestion = () => {
    if (questionText.trim() === "") {
      toast({
        title: "please Enter Question",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        text: questionText,
        type: questionType,
        ...(questionType === "mcq" && { options }),
      },
    ]);

    setQuestionText("");
    setQuestionType("descriptive");
    setOptions([]);
    setOptionText("");
  };

  const addOption = () => {
    if (optionText.trim() === "") {
      toast({
        title: "Please enter an option",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setOptions((prevOptions) => [...prevOptions, optionText]);

    setOptionText("");
  };


  const handleDeleteQuestion =(deletedIndex:any)=>{
    setQuestions(prev=> prev.filter((_,index)=>index !== deletedIndex))
  }

  const handleSubmit = () => {
    
    if (surveyTitle.trim() === "") {
      toast({
        title: "Please enter title",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (surveyDescription.trim() === "") {
      toast({
        title: "Enter Description",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const surveyData = {
      id: new Date().getTime().toString(),
      title: surveyTitle,
      description: surveyDescription,
      questions: questions,
    };
    dispatch(addSurveys(surveyData));
    toast({
      title: "Survey submitted successfully",
      description: "Please check in home page.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setSurveyTitle("");
    setSurveyDescription("");
    setQuestions([]);
  };

  return (
    <Box
      p={6}
      borderWidth={3}
      borderRadius="md"
      borderColor="blue.500"
      height="80vh"
      overflowY="auto"
    >
      <Flex
        flexDirection={["column", "row", "row"]}
        justifyContent="space-around"
      >
        <Box width={["100%", "45%", "35%"]}>
          <Text
            textAlign="center"
            fontWeight="bolder"
            fontSize={["md", "xl", "2xl"]}
          >
            Survey Form Creation
          </Text>

          <Flex direction="column" mt="15px" width="100%" mx="auto">
            <FormControl>
              <FormLabel>Survey Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter Survey Title"
                value={surveyTitle}
                onChange={(e: any) => setSurveyTitle(e.target.value)}
              />
              <FormLabel mt={2}>Survey Description</FormLabel>
              <Textarea
                placeholder="Enter Survey Description"
                value={surveyDescription}
                onChange={(e) => setSurveyDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter Question</FormLabel>
              <Input
                type="text"
                placeholder="Enter Question"
                value={questionText}
                onChange={(e: any) => setQuestionText(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Select Question Type</FormLabel>
              <RadioGroup
                defaultValue="descriptive"
                onChange={(value: any) =>
                  setQuestionType(value as "descriptive" | "mcq")
                }
              >
                <Stack direction="row">
                  <Radio
                    value="descriptive"
                    isChecked={questionType === "descriptive"}
                  >
                    Descriptive
                  </Radio>
                  <Radio value="mcq" isChecked={questionType === "mcq"}>
                    MCQ
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            {questionType === "mcq" && (
              <FormControl mt={4}>
                <FormLabel>Options for MCQ</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Option"
                  value={optionText}
                  onChange={(e: any) => setOptionText(e.target.value)}
                />
                <Button mt={2} colorScheme="teal" onClick={addOption}>
                  Add Option
                </Button>

                {options.map((option, index) => (
                  <Flex key={index} mt={2} alignItems="center">
                    <Text ml="20px">{`${String.fromCharCode(
                      97 + index
                    ).toUpperCase()}) ${
                      option.charAt(0).toUpperCase() + option.slice(1)
                    }`}</Text>
                  </Flex>
                ))}
              </FormControl>
            )}

            <Button mt={4} colorScheme="teal" onClick={addQuestion}>
              Add Question
            </Button>

            {questions.length >= 5 && (
              <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
                Submit Questions
              </Button>
            )}
          </Flex>
        </Box>
        <VStack spacing={4} mt={4} align="start" width={["100%", "45%", "35%"]}>
          <Text textAlign="center" color="green">
            Add at least 5 questions{" "}
          </Text>
          {questions.map((q, index) => (
            <Flex
              key={index}
              alignItems="start"
              flexDirection="column"
              width="100%"
            >
              <Box
                border="1px"
                borderColor="gray.200"
                p="5px"
                rounded="md"
                width="100%"
                display="flex"
                gap="10px"
                alignItems="center"
                color="blue.600"
                fontWeight="bolder"
                data-testid="questions"
                position="relative"
                onMouseEnter={()=>setHoveredQuestion(index)}
                onMouseLeave={()=>setHoveredQuestion("")}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  w="22px"
                  h="22px"
                  borderRadius="50%"
                  bg="white"
                  color="green"
                  sx={{ fontWeight: "bolder" }}
                  textAlign="center"
                  
                >
                  {index + 1}{" "}
                </Box>
                <Box className={styles["survey__question"]}>
                  {q.text?.charAt(0)?.toUpperCase() + q.text?.slice(1)} {"?"}
                </Box>
                {
                  hoveredQuestion === index && (
                    <DeleteIcon
                    position="absolute"
                    right="8px"
                    cursor="pointer"
                    color="red"
                    onClick={()=>handleDeleteQuestion(index)}
                  />
                  )
                }
               
              </Box>
              {q.type === "mcq" && (
                <SimpleGrid columns={2} spacing={4} mt={2} width="100%">
                  {q.options?.map((option, optionIndex) => (
                    <Box
                      key={optionIndex}
                      border="1px"
                      borderColor="gray.200"
                      p="5px"
                      rounded="md"
                      width="100%"
                      display="flex"
                      gap="10px"
                      alignItems="center"
                      bg="lightgray"
                      color="red.600"
                      fontWeight="bolder"
                      data-testid="option"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        w="22px"
                        h="22px"
                        borderRadius="50%"
                        bg="black"
                        color="white"
                        sx={{ fontWeight: "bolder" }}
                        textAlign="center"
                      >
                        {String.fromCharCode(97 + optionIndex).toUpperCase()}
                      </Box>
                      {`${option.charAt(0).toUpperCase() + option.slice(1)}`}
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default SurveyPage;
