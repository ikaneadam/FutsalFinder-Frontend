import React, { useEffect, useState } from 'react';
import axios from 'axios';

type mapEmbedProps = {
    latitude: string | number;
    longitude: string | number;
};

const MapEmbed = (props: mapEmbedProps) => {
    const { latitude, longitude } = props;

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [map, setMap] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios({
                    method: 'get',
                    url: `https://www.google.com/maps/embed/v1/view?center=${latitude},${longitude}&zoom=15&maptype=roadmap&key=AIzaSyCjuLOwviIiStcbWdx-EJhsR59MQzW_EHk`,
                });

                setMap(response.config.url!);
                setError(false);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [latitude, longitude]);

    // let backend send this
    return (
        <>
            {error && <div>Could not load map.</div>}
            {loading && <div>Loading...</div>}
            {!loading && !error && (
                <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src={map}
                    allowFullScreen
                />
            )}
        </>
    );
};

export default MapEmbed;
