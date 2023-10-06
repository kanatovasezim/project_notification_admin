import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import Mailing from "./components/Mailing";
import Scheduler from "./components/Scheduler";
import SearchCriteria from "./components/SearchCriteria";

const Main: React.FC = () => {

    return (
        <Flex flexDirection="column" minH="100vh">
            <Box bg="blue.500" color="white" p={7}>
                <Text>Project Notification Service Admin Panel</Text>
            </Box>

            <Box flex="1" display="flex">
                <SearchCriteria/>
                <Box flex="2" display="flex" flexDirection="column" mr={4}>
                    <Scheduler/>
                    <Mailing/>
                </Box>
            </Box>
        </Flex>
    );
};

export default Main;
