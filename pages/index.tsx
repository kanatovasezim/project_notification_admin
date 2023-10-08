import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Main from "./Main";
import {Head} from "next/document";

function MyApp() {            <Head><link rel="icon" href="/public/logo-small.png"/></Head>

    return (
        <ChakraProvider>

            <Main />
        </ChakraProvider>
    )
}

export default MyApp;
