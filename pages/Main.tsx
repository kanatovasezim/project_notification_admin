import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import Mailing from "./components/Mailing";
import Scheduler from "./components/Scheduler";
import SearchCriteria from "./components/SearchCriteria";

const Main: React.FC = () => {

    return (
        <Flex flexDirection={{base: 'column', md: 'column'}} minH="100vh">
            <Box bg="blue.500" color="white" p={7}>
                <Text>Project Notification Service Admin Panel</Text>
            </Box>
            <Flex flexDirection={{base: 'column', lg: 'row'}}>
                <SearchCriteria/>
                <Box flex={{base: '4', md: '12'}} display="flex" flexDirection="column" mr={4}>
                    <Scheduler/>
                    <Mailing/>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Main;
