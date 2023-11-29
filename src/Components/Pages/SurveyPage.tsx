import React, { useState } from "react";
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
  Checkbox,
} from "@chakra-ui/react";
import { addSurveys } from "../features/redux/surveySlice";
import { useDispatch } from "react-redux";

interface Question {
  text: string;
  type: "descriptive" | "mcq";
  options?: string[];
}

const SurveyPage: React.FC = () => {
    const dispatch=useDispatch()
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState<string>("");
  const [questionType, setQuestionType] = useState<"descriptive" | "mcq">(
    "descriptive"
  );
  const [options, setOptions] = useState<string[]>([]);
  const [optionText, setOptionText] = useState<string>("");
  const [surveyTitle, setSurveyTitle] = useState<string>("");
  const [surveyDescription, setSurveyDescription] = useState<string>("");

  const addQuestion = () => {
    if (questionText.trim() === "") {
      alert("Please enter a question.");
      return;
    }

    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        text: questionText,
        type: questionType,
        options: questionType === "mcq" ? options : undefined,
      },
    ]);
   

    setQuestionText("");
    setQuestionType("descriptive");
    setOptions([]);
    setOptionText("");
  };

  const addOption = () => {
    if (optionText.trim() === "") {
      alert("Please enter an option.");
      return;
    }

    setOptions((prevOptions) => [...prevOptions, optionText]);

    setOptionText("");
  };



  const handleSubmit=()=>{
    const surveyData={
        id:new Date().getTime().toString(),
        title:surveyTitle,
        description:surveyDescription,
        questions: questions
    }
    dispatch(addSurveys(surveyData))
  }

  return (
    <Box
      p={6}
      borderWidth={3}
      borderRadius="md"
      borderColor="blue.500"
      height="80vh"
      overflowY="auto"
    >
      <Text
        textAlign="center"
        fontWeight="bolder"
        fontSize={["md", "xl", "2xl"]}
      >
        Survey Form Creation
      </Text>

      <Flex
        direction="column"
        mt="15px"
        width={["100%", "60%", "30%"]}
        mx="auto"
      >
        <FormControl>
          <FormLabel>Survey Title</FormLabel>
          <Input
            type="text"
            placeholder="Enter Survey Title"
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
          />
          <FormLabel mt={2}>Survey Description</FormLabel>
          <Textarea
            placeholder="Enter Survey Description"
            value={surveyDescription}
            onChange={(e) => setSurveyDescription(e.target.value)}
          />
        </FormControl>

        <VStack spacing={4} mt={4} align="start">
            <Text textAlign='center' color='green'>Add at least 5 questions </Text>
          {questions.map((q, index) => (
            <Flex key={index} alignItems="start" flexDirection="column">
              <Text>
                {index + 1}. {q.text}
              </Text>
              {q.type === "mcq" && (
                <VStack align="start" mt={2}>
                  {q.options?.map((option, optionIndex) => (
                    <Text key={optionIndex}>{`- ${option}`}</Text>
                  ))}
                </VStack>
              )}
            </Flex>
          ))}
        </VStack>

        <FormControl mt={4}>
          <FormLabel>Enter Question</FormLabel>
          <Input
            type="text"
            placeholder="Enter Question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Select Question Type</FormLabel>
          <RadioGroup
            defaultValue="descriptive"
            onChange={(value) =>
              setQuestionType(value as "descriptive" | "mcq")
            }
          >
            <Stack direction="row">
              <Radio value="descriptive" isChecked={questionType === 'descriptive' ? true : false}>Descriptive</Radio>
              <Radio value="mcq" isChecked={questionType === 'mcq' ? true : false}>MCQ</Radio>
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
              onChange={(e) => setOptionText(e.target.value)}
            />
            <Button mt={2} colorScheme="teal" onClick={addOption}>
              Add Option
            </Button>

            {options.map((option, index) => (
              <Flex key={index} mt={2} alignItems="center">
                <Checkbox isReadOnly isChecked>{`- ${option}`}</Checkbox>
              </Flex>
            ))}
          </FormControl>
        )}

        <Button mt={4} colorScheme="teal" onClick={addQuestion}>
          Add Question
        </Button>

        {questions.length >= 5  && (
            <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
            Submit Questions
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default SurveyPage;
