import React from 'react';
import {Box, Button, Flex, Image, Text} from "@chakra-ui/react";
import Mailing from "./components/Mailing";
import Scheduler from "./components/Scheduler";
import SearchCriteria from "./components/SearchCriteria";
import {withAuth} from "./utils/withAuth";
import {ExternalLinkIcon} from '@chakra-ui/icons'


const Main: React.FC = () => {

    const logout =  () => {
        localStorage.clear();
    }

    return (
        <Flex flexDirection={'column'} minH="100vh">
            <Box
                bgColor={"#18234c"}
                display={'flex'}
                alignItems="center"
                justifyContent={ 'space-between'}
                color="white"
                p={{base: 5, md: 7, lg: 5}}
            >
                <Box
                    flex={{base: 'none', md: '15%', lg: '20%'}}
                    width="100%"
                    order={{base: 1, md: 1, lg: 1}}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Image src="/logo-white.png" maxWidth="70%" alt="Logo-white"/>
                </Box>
                <Text
                    flex={{base: 'none', md: '70%', lg: '60%'}}
                    order={{base: 2, md: 2, lg: 2}}
                    fontSize={{base: 'large', md: 'x-large', lg: 'xx-large'}}
                    ml={{base: 0, md: 5, lg: 5}}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    Project-Notifier Service Admin Panel
                </Text>
                <Box flex={{base: 'none', md: '15%', lg: '20%'}}
                     order={{base: 3, md: 3, lg: 3}}
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                >
                    <Button
                        onClick={logout}
                        colorScheme="red"
                        size="sm"
                        leftIcon={<ExternalLinkIcon/>}
                    >
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

export default withAuth(Main);
