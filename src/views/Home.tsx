import React, { useState } from 'react';
import Nav from '../components/Nav';
import Rooms from '../Sections/RoomSections/Rooms';
import Header from '../components/Footer';
import { Typography } from '@mui/material';
import { parseAddressToString } from '../helpers/parseAddressToString';

export default function Home() {
    return (
        <>
            <Nav />
            <main style={{ margin: 'auto', width: '90%' }}>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Typography variant="h4" color="text.primary">
                        Top searched futsal courts
                    </Typography>
                </div>
                <Rooms />
            </main>
            <Header />
        </>
    );
}
