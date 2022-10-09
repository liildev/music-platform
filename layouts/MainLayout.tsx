import React from 'react';
import { Container } from '@mui/material'
import Navbar from "../components/Navbar";


import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
    children?
}

const MainLayout: React.FC<MainLayoutProps>
    = ({
        children,
        title,
        description,
        keywords
    }) => {
        return (
            <div>
                <Head>
                    <title>{title || 'Music Playground'}</title>
                    <meta name="description" content={description || "Musical platform. Here everyone can leave their track and become famous"} />
                    <meta name="robots" content="index, follow" />
                    <meta name="keywords" content={keywords || "Music, tracks, artists"} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <Navbar />
                <Container style={{ margin: '90px 0' }} maxWidth={false}>
                    {children}
                </Container>
                <Player />
            </div>
        );
    };

export default MainLayout;
