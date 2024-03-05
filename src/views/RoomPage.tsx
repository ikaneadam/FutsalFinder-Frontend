import React, { useCallback } from 'react';
import Header from '../components/header/Header';
import { useParams } from 'react-router-dom';
import useApiLayer from '../api/hooks/UseApiLayer';
import { getAvailableBookingTimes, getRoom } from '../api/RoomsApi';
import LoadingWrapper from '../api/hooks/LoadingWrapper';
import Footer from '../components/Footer';
import { Box, Breadcrumbs, Button, Grid, Icon, Link, Paper, Typography } from '@mui/material';
import { Room } from '../types/Room';
import { getStaticFile } from '../helpers/getStaticFile';
import defaultRoomBanner from '../assets/images/defaultRoomBanner.jpg';
import MapEmbed from '../components/MapEmbed';
import { determineDeviceType, useViewport } from '../helpers/UseViewPort';
import { parseAddressToString } from '../helpers/parseAddressToString';
import OpeningHours from '../components/OpeningHours';
import { AvailableBookingTimes } from '../types/StandardAvailableDate';
import BookingTimePlanner from '../components/BookingTimePlanner/BookingTimePlanner';

export default function RoomPage() {
    const { uuid } = useParams();
    const { width } = useViewport();
    const { isMobile, isTablet } = determineDeviceType(width);

    const fetchRoom = useCallback(() => {
        if (uuid === undefined) {
            return;
        }
        return getRoom(uuid);
    }, [uuid]);

    const fetchAvailabilityPeriods = useCallback(() => {
        if (uuid === undefined) {
            return;
        }
        return getAvailableBookingTimes(uuid);
    }, [uuid]);

    const {
        data: roomData,
        status: roomStatus,
        statusCode: roomStatusCode,
    } = useApiLayer<Room>(fetchRoom);

    const {
        data: bookingTimesData,
        status: bookingTimeStatus,
        statusCode: bookingTimeStatusCode,
    } = useApiLayer<AvailableBookingTimes>(fetchAvailabilityPeriods);

    const getCurrentHost = () => {
        return { name: roomData?.host?.name || '', uuid: roomData?.hostUuid || '' };
    };

    const getCurrentRoom = () => {
        return { name: roomData?.name || '', uuid: roomData?.uuid || '' };
    };

    const getPrimaryImage = (): string => {
        const primaryImage: string | undefined = roomData?.images[0]?.fileName;

        if (!primaryImage) {
            return defaultRoomBanner;
        }

        return getStaticFile(primaryImage);
    };

    const isRoomPageReady = () => {
        return uuid !== undefined;
    };

    const mobileVersionWidth = 1220;
    const shouldDisplayMobileVersion = mobileVersionWidth >= width;

    return (
        <>
            <Header />
            <LoadingWrapper
                httpStatus={roomStatus}
                statusCode={roomStatusCode}
                isReady={isRoomPageReady()}
            >
                <>
                    {roomData && (
                        <>
                            <div
                                style={{
                                    position: 'relative',
                                    color: 'white',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                    backgroundImage: 'url(' + getPrimaryImage().toString() + ')',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '50%',
                                    minHeight: '150px',
                                    backgroundSize: '100% auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '10px',
                                }}
                            >
                                <div style={{ margin: '0 auto', width: '80%' }}>
                                    <Typography variant="h2" color="text.home">
                                        {getCurrentRoom().name}
                                    </Typography>
                                </div>
                            </div>

                            <main
                                style={{
                                    minHeight: '70vh',
                                    padding: '10px',
                                    margin: 'auto',
                                    width: shouldDisplayMobileVersion ? '90%' : '70%',
                                }}
                            >
                                <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#879199' }}>
                                    <Link underline="hover" color="inherit" href="/">
                                        Home
                                    </Link>
                                    <Link underline="hover" color="inherit" href="/">
                                        {getCurrentHost().name}
                                    </Link>
                                    <Link
                                        underline="hover"
                                        color="text.primary"
                                        aria-current="page"
                                    >
                                        {getCurrentRoom().name}
                                    </Link>
                                </Breadcrumbs>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: shouldDisplayMobileVersion
                                            ? 'column'
                                            : 'row',
                                        gap: '10px',
                                        marginTop: '10px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                            flexGrow: '2',
                                            flexShrink: '1',
                                        }}
                                    >
                                        <div
                                            style={{
                                                borderRadius: '8px',
                                                boxShadow: '-1px 5px 17px 0 rgba(0,0,0,.1)',
                                                backgroundColor: '#fff',
                                                padding: '5px',
                                            }}
                                        >
                                            <LoadingWrapper
                                                httpStatus={bookingTimeStatus}
                                                statusCode={bookingTimeStatusCode}
                                                isReady={isRoomPageReady()}
                                                relative={true}
                                            >
                                                {bookingTimesData && (
                                                    <BookingTimePlanner
                                                        availableBookingTimes={bookingTimesData}
                                                    />
                                                )}
                                            </LoadingWrapper>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            flexGrow: '1',
                                            width: shouldDisplayMobileVersion ? '100%' : '200px',
                                            gap: '10px',
                                            flexShrink: '0',
                                            display: 'flex',
                                            flexDirection: shouldDisplayMobileVersion
                                                ? 'row'
                                                : 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '5px',
                                                height: '100%',
                                                borderRadius: '8px',
                                                padding: '5px',
                                                boxShadow: '-1px 5px 17px 0 rgba(0,0,0,.1)',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <MapEmbed
                                                latitude={roomData?.address?.longitude!}
                                                longitude={roomData?.address?.latitude!}
                                            />

                                            <Typography variant="body2" color="text.main">
                                                {parseAddressToString(roomData?.address!)}
                                            </Typography>
                                        </div>
                                        <div
                                            style={{
                                                minHeight: '280px',
                                                width: '100%',
                                                borderRadius: '8px',
                                                boxShadow: '-1px 5px 17px 0 rgba(0,0,0,.1)',
                                                backgroundColor: '#fff',
                                            }}
                                        >
                                            <LoadingWrapper
                                                httpStatus={bookingTimeStatus}
                                                statusCode={bookingTimeStatusCode}
                                                isReady={isRoomPageReady()}
                                                relative={true}
                                            >
                                                <OpeningHours
                                                    availableBookingTimes={bookingTimesData}
                                                />
                                            </LoadingWrapper>
                                        </div>
                                    </div>
                                </div>

                                {/*<div style={{ width: '40%' }}>*/}
                                {/*    <Carousel autoPlay={true} animation="slide">*/}
                                {/*        {roomData?.images?.map((item: Image, index) => (*/}
                                {/*            <Paper*/}
                                {/*                key={index}*/}
                                {/*                style={{ display: 'flex', flexDirection: 'column' }}*/}
                                {/*            >*/}
                                {/*                <img src={getStaticFile(item.fileName)} />*/}
                                {/*            </Paper>*/}
                                {/*        ))}*/}
                                {/*    </Carousel>*/}
                                {/*</div>*/}
                            </main>
                        </>
                    )}
                </>
            </LoadingWrapper>
            <Footer />
        </>
    );
}
