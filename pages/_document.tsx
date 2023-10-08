import {ColorModeScript} from '@chakra-ui/react'
import {Html, Head, Main, NextScript} from 'next/document'
import {theme} from './_app'
import * as React from "react";

export default function Document() {
    return (
        <Html lang='en'>
            <Head ><link rel="icon" href="/logo-small.png"/></Head>
            <body>
            {/* 👇 Here's the script */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}