import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Main from './Main';
import Head from 'next/head';

function MyApp() {
    return (
        <ChakraProvider>
            <Head>
                <link rel="icon" href="/logo-small.png"/>
                <title>ADS Project Notification Admin Panel</title>
            </Head>
                <Main/>
        </ChakraProvider>
    );
}

export default MyApp;
