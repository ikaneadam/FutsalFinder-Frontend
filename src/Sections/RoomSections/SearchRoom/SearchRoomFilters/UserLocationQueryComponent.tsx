import React, { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUrlQuery } from '../../../../helpers/getUrlQuery';

type Location = {
    latitude: number | undefined;
    longitude: number | undefined;
};

const emptyLocationObject = {
    latitude: undefined,
    longitude: undefined,
};

const UserLocationQueryComponent: React.FC = () => {
    const navigate = useNavigate();
    const [enableUserLocation, setEnableUserLocation] = useState<boolean>(false);
    const [location, setLocation] = useState<Location>(emptyLocationObject);

    useEffect(() => {
        if (enableUserLocation) {
            getLocation();
            return;
        }
        setLocation(emptyLocationObject);
    }, [enableUserLocation]);

    useEffect(() => {
        const url = new URL(window.location.href);
        if (enableUserLocation) {
            url.searchParams.delete('address');
        }

        const urlUpdatedWithGeoQueries = getUrlQuery(url, location);
        navigate(urlUpdatedWithGeoQueries.fullUrl);
    }, [location]);

    const getLocation = async () => {
        if (!navigator.geolocation) {
            return;
        }
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    };

    return (
        <div>
            <Chip
                label="Use Current location"
                variant="outlined"
                onClick={() => {
                    setEnableUserLocation(!enableUserLocation);
                }}
            />
        </div>
    );
};

export default UserLocationQueryComponent;
