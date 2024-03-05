import React from 'react';
import defaultImage from '../../assets/images/gaming.jpg';
import { Address } from '../../types/Address';
import { Image } from '../../types/Image';
import { getStaticFile } from '../../helpers/getStaticFile';
import { parseAddressToString } from '../../helpers/parseAddressToString';
import parseDistanceToReadableString from '../../helpers/parseDistanceToReadableString';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';

type roomCardProps = {
    imageUrls: Image[];
    name: string;
    address: Address;
    distance?: number;
    roomUUID: string;
};

export default function RoomCard(props: roomCardProps) {
    const { imageUrls, name, address, distance, roomUUID } = props;
    const navigate = useNavigate();

    const getPrimaryImage = (): string => {
        const primaryImage: string | undefined = imageUrls[0]?.fileName;

        if (!primaryImage) {
            return defaultImage;
        }

        return getStaticFile(primaryImage);
    };

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                height: '300px',
                boxShadow: '0 6px 24px rgba(0,0,0,.15)',
                margin: '10px',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <CardContent
                sx={{
                    width: '100%',
                    backgroundImage: 'url(' + getPrimaryImage().toString() + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50%',
                    height: '100%',
                    backgroundSize: '100% auto',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                    justifyContent: 'flex-end',
                    position: 'relative',
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    '&::before': {
                        // Pseudo-element for the overlay
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to top right, rgba(0,0,0,0.5), rgba(0,0,0,0))', // Adjust the gradient as needed
                        zIndex: 0,
                    },
                    '& > *': {
                        position: 'relative',
                        zIndex: 1,
                    },
                }}
            >
                <div style={{ margin: '0 auto', width: '80%' }}>
                    <h2>{name}</h2>
                    {distance && (
                        <h4 style={{ color: 'orange' }}>
                            {parseDistanceToReadableString(distance)}
                        </h4>
                    )}
                </div>
            </CardContent>
            <CardContent
                sx={{
                    textAlign: 'center',
                    width: '100%', // Override MUI padding if necessary
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '5px',
                        textOverflow: 'ellipsis',
                        color: '#566670',
                    }}
                >
                    <PlaceIcon fontSize="small" />
                    <Typography variant="body2" color="text.main">
                        {parseAddressToString(address)}
                    </Typography>
                </div>
                <Button
                    variant="outlined"
                    onClick={() => navigate(`/room/${roomUUID}`)}
                    sx={{
                        width: '95%',
                        marginTop: '20px',
                        borderRadius: '15px',
                        color: '#3964FF',
                        fontFamily: "'Novecento Sans Wide Medium', sans-serif",
                        border: '1px solid #3964FF',
                    }}
                >
                    Book now
                </Button>
            </CardContent>
        </Card>
    );
}

// <Button text="Book now" onClick={() => {}} buttonType={ButtonTypes.LightButton} />
