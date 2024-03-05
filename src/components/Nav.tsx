import banner from '../assets/images/banner_2.avif';
import React, { ChangeEvent, useState } from 'react';
import { determineDeviceType, useViewport } from '../helpers/UseViewPort';
import SearchRoom from '../Sections/RoomSections/SearchRoom/SearchRoom';

export default function Nav() {
    const { width } = useViewport();
    const { isMobile, isTablet, isDesktop } = determineDeviceType(width);

    return (
        <nav
            style={{
                position: 'relative',
                height: '75vh',
                overflow: 'hidden',
            }}
        >
            <img
                src={banner}
                alt={'Futsal game'}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(30%)',
                }}
            />

            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <h1
                    style={{
                        fontSize: '3em',
                        marginBottom: '0.5em',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    Discover Your Game
                </h1>
                <p
                    style={{
                        marginBottom: '1em',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    Find the Nearest Futsal Courts Instantly, Wherever You Are.
                </p>

                <SearchRoom className="searchRoomHome" />
            </div>
        </nav>
    );
}
