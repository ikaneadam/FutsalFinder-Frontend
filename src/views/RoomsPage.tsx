import React, { useCallback, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Rooms from '../Sections/RoomSections/Rooms';
import { determineDeviceType, useViewport } from '../helpers/UseViewPort';
import SearchRoom from '../Sections/RoomSections/SearchRoom/SearchRoom';
import { useLocation } from 'react-router-dom';
import useApiLayer, { HttpStatus } from '../api/hooks/UseApiLayer';
import { getAddress } from '../api/AddressApi';
import { GeoAddressApiResponse } from '../types/GeoAddress';
import LoadingWrapper from '../api/hooks/LoadingWrapper';
import getDistanceQueryFromGeoAddress from '../helpers/getDistanceQueryFromGeoAddress';
import { DistanceQuery } from '../types/DistanceQuery';
import { toast, Toaster } from 'react-hot-toast';
import Header from '../components/header/Header';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function RoomsPage() {
    const query = useQuery();
    const { width } = useViewport();
    const [distanceQuery, setDistanceQuery] = useState<undefined | DistanceQuery>(undefined);
    const { isMobile, isTablet, isDesktop } = determineDeviceType(width);
    const initialAddress = decodeURIComponent(query.get('address') || '');
    const initialRadius = query.get('radius') || '';
    const initialLatitude = query.get('latitude');
    const initialLongitude = query.get('longitude');

    const fetchAddress = useCallback(() => {
        if (initialAddress.length < 3) {
            return;
        }
        return getAddress(initialAddress);
    }, [initialAddress, initialRadius]);

    const { data, status, statusCode } = useApiLayer<GeoAddressApiResponse>(fetchAddress);

    useEffect(() => {
        if (initialLatitude !== null && initialLongitude !== null) {
            const distanceQuery = {
                latitude: initialLongitude,
                longitude: initialLatitude,
                ...(initialRadius === '' ? {} : { radius: initialRadius }),
            };

            setDistanceQuery(distanceQuery);
        }
    }, [initialLatitude, initialLongitude, initialRadius]);

    useEffect(() => {
        if (initialLatitude !== null && initialLongitude !== null) {
            return;
        }

        if (status === HttpStatus.isSuccess) {
            const { isAddressFound, distanceQuery } = getDistanceQueryFromGeoAddress(
                data!,
                initialRadius
            );
            if (!isAddressFound) {
                setDistanceQuery(undefined);
            }

            setDistanceQuery(distanceQuery);
        }

        if (status === HttpStatus.isError) {
            setDistanceQuery(undefined);
        }
    }, [initialRadius, status]);

    useEffect(() => {
        if (status === HttpStatus.isSuccess) {
            const { isAddressFound, distanceQuery } = getDistanceQueryFromGeoAddress(
                data!,
                initialRadius
            );
            if (!isAddressFound) {
                toast.error('No address found', { duration: 1500 });
            }
        }
    }, [status]);

    const isRoomPageReady = () => {
        if (status === HttpStatus.isSuccess) {
            return !!distanceQuery;
        }

        if (status === HttpStatus.isError) {
            return true;
        }

        return false;
    };

    const getRoomPageWidth = () => {
        if (isDesktop) {
            return '80%';
        }

        if (isTablet) {
            return '95%';
        }

        return '90%';
    };
    return (
        <>
            <Header />
            <main style={{ margin: 'auto', width: getRoomPageWidth() }}>
                <SearchRoom
                    className="searchRoom"
                    initialAddress={initialAddress}
                    initialRadius={initialRadius}
                />
                <Toaster />
                <LoadingWrapper
                    httpStatus={status}
                    statusCode={statusCode}
                    isReady={isRoomPageReady()}
                    displayError={false}
                >
                    <>
                        <Rooms distanceQuery={distanceQuery} />
                    </>
                </LoadingWrapper>
            </main>
            <Footer />
        </>
    );
}
