import React from 'react';
import {Box, Flex, Image, Text} from "@chakra-ui/react";
import Mailing from "./components/Mailing";
import Scheduler from "./components/Scheduler";
import SearchCriteria from "./components/SearchCriteria";

const Main: React.FC = () => {

    return (
        <Flex flexDirection={{base: 'column', md: 'column'}} minH="100vh">
            <Box
                bgColor={"#18234c"}
                display={"flex"}
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems={{ base: 'center', md: 'flex-start' }}
                color="white"
                p={{ base: 5, md: 7, lg: 10 }}
            >
                <Box
                    alignSelf={{ base: 'center', md: 'auto' }}
                    flex={{ base: 'none', md: '1' }}
                >
                    <Image src="/logo-white.png" maxWidth={{ base: '100%', md: '60%', lg: '40%' }} alt="Logo-white" />
                </Box>
                <Text fontSize={{ base: 'large', md: 'x-large', lg: 'xx-large' }} ml={{ base: '0', md: '5' }}>
                    Project-Notifier Service Admin Panel
                </Text>
            </Box>




            <Flex flexDirection={{base: 'column', lg: 'row'}}>
                <SearchCriteria/>
                <Box flex={{base: '4', md: '12'}} display="flex" flexDirection="column" mr={4}>
                    <Scheduler/>
                    <Mailing/>
                </Box>
            </Flex>

            {/* Footer */}
            <Box
                bgColor="#18234c"
                color="white"
                p={4}
                textAlign="center"
                mt="auto" // Push the footer to the bottom
            >
                &copy; Alter Solutions Deutschland GmbH 2023. All rights reserved.
            </Box>

        </Flex>
    );
};

export default Main;
