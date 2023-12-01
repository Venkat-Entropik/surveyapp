import { Card, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";
import img from '../assets/17.jpg'
import { SurveyDrawer } from "../Drawer/SurveyDrawer";


interface survey {
  selector: any;
  user: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}



const SurveyCard:React.FC<survey> = ({selector,user,isLoading,setIsLoading}) => {
  const drawerHide = selector.hasOwnProperty('database')
  
  
  return (
    <Card p="10px">
      <Image
        objectFit="cover"
        src={img}
        alt="Chakra UI"
        height="100px"
        borderRadius="10px"
      />

      <Heading size="sm" mt="10px">{selector?.title}</Heading>
      <Text pt="5px">{selector?.description}</Text>
      
        {!drawerHide  && <SurveyDrawer id={selector?.id} user={user} isLoading={isLoading} setIsLoading={setIsLoading}/>}
      
    </Card>
  );
};

export default SurveyCard;
