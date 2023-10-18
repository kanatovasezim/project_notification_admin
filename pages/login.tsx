import {Container, Box, Heading, Image} from '@chakra-ui/react';
import Login from "./components/Login";
import React from "react";

const LoginPage = () => {
    return (
        <Container display={"flex"} justifyContent={"center"}>
            <Box width={'inherit'} m={'20%'} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <Box my={'20%'}>
                    <Image src="/logo-color.png" width={"fit-content"} height={"auto"} alt="Logo-color"/>
                </Box>
                <Heading as="h1" size="xl" mb={6}>
                    Login
                </Heading>
                <Login/>
            </Box>
        </Container>
    );
}

export default LoginPage;