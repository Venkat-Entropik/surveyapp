import { Box } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const SurveyCard = () => {
    const selector = useSelector((state)=>{
        return state
    })
    console.log(selector)
  return (
    <Box>
      survey card
    </Box>
  )
}

export default SurveyCard
