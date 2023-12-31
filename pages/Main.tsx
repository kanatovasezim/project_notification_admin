import React from 'react';
import { Box, Button, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import Mailing from "./components/Mailing";
import Scheduler from "./components/Scheduler";
import SearchCriteria from "./components/SearchCriteria";
import {withAuth} from "../utils/withAuth";
import { ExternalLinkIcon } from '@chakra-ui/icons'


const Main: React.FC<{ checkAuthenticationStatus: () => void }> = ({ checkAuthenticationStatus }) => {
    const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

    const logout = () => {
        localStorage.clear();
        checkAuthenticationStatus();
    }

    return (
        <Flex flexDirection={'column'} minH="100vh">
            <Box
                bgColor="#18234c"
                display="flex"
                flexDirection={isLargerThanMd ? "row" : "column"}
                alignItems={isLargerThanMd ? "center" : "stretch"}
                justifyContent="space-between"
                color="white"
                p={{base: 5, md: 7, lg: 5}}
            >
                <Box
                    width="100%"
                    display="flex"
                    flex={{base: "none", md: "15%", lg: "20%"}}
                    justifyContent="center"
                    alignItems="center"
                    py={{base: 5, md: 0, lg: 0}}
                    order={isLargerThanMd ? 1 : 2}
                >
                    <Image src="/logo-white.png" width={{base: "40%", md: "60%", lg: "70%"}}  alt="Logo-white"/>
                </Box>
                <Text
                    flex={{base: "none", md: "70%", lg: "60%"}}
                    order={isLargerThanMd ? 2 : 1}
                    fontSize={{base: "md", md: "x-large", lg: "xx-large"}}
                    ml={{base: 0, md: 5, lg: 5}}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    Project-Notifier Service Admin Panel
                </Text>
                <Box
                    flex={{base: "none", md: "15%", lg: "20%"}}
                    order={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button onClick={logout} colorScheme="red" size="sm" leftIcon={<ExternalLinkIcon/>}>
                        Logout
                    </Button>
                </Box>
            </Box>

            <Flex flexDirection={{base: 'column', lg: 'row'}}>
                <SearchCriteria/>
                <Box flex={{base: '4', md: '12'}} display="flex" flexDirection="column" mr={4}>
                    <Scheduler/>
                    <Mailing/>
                </Box>
            </Flex>

            <Box
                bgColor="#18234c"
                color="white"
                p={4}
                textAlign="center"
                mt="auto"
            >
                &copy; Alter Solutions Deutschland GmbH 2023. All rights reserved.
            </Box>
        </Flex>
    );
};

export default withAuth(Main);
