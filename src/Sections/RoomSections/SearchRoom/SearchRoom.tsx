import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectField from '../../../components/common/text/SelectField';
import Button from '@mui/material/Button';
import './SearchRoomHome.css';
import './SearchRoom.css';
import { Autocomplete, TextField } from '@mui/material';
import { getAddressPredictions } from '../../../api/AddressApi';
import useApiLayer, { HttpStatus } from '../../../api/hooks/UseApiLayer';
import { AutoCompleteResponse } from '../../../types/AddressPredictionApiResponse';
import getOptionsFromAutoCompleteResponse, {
    predictionOptions,
} from '../../../helpers/getOptionsFromAutoCompleteResponse';
import axios, { CancelTokenSource } from 'axios';
import UserLocationQueryComponent from './SearchRoomFilters/UserLocationQueryComponent';
import RoomRadiusQueryComponent from './SearchRoomFilters/RoomRadiusQueryComponent';
import { getUrlQuery } from '../../../helpers/getUrlQuery';

type SearchRoomProps = {
    initialAddress?: string;
    initialRadius?: string;
    className: string;
};

export default function SearchRoom(props: SearchRoomProps) {
    const { initialAddress = '', initialRadius = '', className } = props;
    const navigate = useNavigate();

    const [address, setAddress] = useState<string>(initialAddress);
    const [predictions, setPredictions] = useState<predictionOptions[]>([]);
    const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null);

    const fetchAddressPredictions = useCallback(async () => {
        if (address.length < 3) {
            return;
        }
        if (cancelTokenSourceRef.current) {
            cancelTokenSourceRef.current.cancel('Cancelled due to new request');
        }
        cancelTokenSourceRef.current = axios.CancelToken.source();

        try {
            const response = await getAddressPredictions(address, {
                cancelToken: cancelTokenSourceRef.current.token,
            });
            return response;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request cancelled:', error.message);
            }
        }
    }, [address]);

    const { data, status, statusCode } = useApiLayer<AutoCompleteResponse>(fetchAddressPredictions);

    useEffect(() => {
        if (status === HttpStatus.isSuccess && data) {
            const predictionOptions = getOptionsFromAutoCompleteResponse(data);
            setPredictions(predictionOptions);
        }
    }, [status]);

    const handleAddressInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    function isValidAddressChosen() {
        return address.length >= 3;
    }

    const searchButtonDisabled = (): boolean => {
        return !isValidAddressChosen();
    };

    const searchButton = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('longitude');
        url.searchParams.delete('latitude');
        const urlUpdatedWithGeoQueries = getUrlQuery(url, { address: address });
        navigate(`/rooms${urlUpdatedWithGeoQueries.search}`);
    };

    return (
        <div className={className}>
            {className === 'searchRoomHome' ? (
                <>
                    <div className={`${className}Container`}>
                        <Autocomplete
                            freeSolo
                            groupBy={(option: predictionOptions) => option.place}
                            options={predictions}
                            onChange={(event: any, newValue: null | any) => {
                                if (newValue !== null) {
                                    setAddress(newValue.description);
                                }
                            }}
                            getOptionLabel={(option: predictionOptions | string) => {
                                if (typeof option === 'string') {
                                    return option;
                                }
                                return option.description;
                            }}
                            className="searchRoomHomeInput"
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="searchRoomHomeInput"
                                    label="Address, street name, city..."
                                    variant="standard"
                                    onChange={handleAddressInputChange}
                                />
                            )}
                        />
                    </div>
                    <div className={`${className}Actions`}>
                        <RoomRadiusQueryComponent className={`${className}Select`} />
                        <Button
                            className={`${className}Button`}
                            variant="contained"
                            onClick={searchButton}
                            disabled={searchButtonDisabled()}
                        >
                            Search
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className={`${className}Container`}>
                        <Autocomplete
                            freeSolo
                            groupBy={(option: predictionOptions) => option.place}
                            options={predictions}
                            onChange={(event: any, newValue: null | any) => {
                                if (newValue !== null) {
                                    setAddress(newValue.description);
                                }
                            }}
                            getOptionLabel={(option: predictionOptions | string) => {
                                if (typeof option === 'string') {
                                    return option;
                                }
                                return option.description;
                            }}
                            className="searchRoomHomeInput"
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className="searchRoomHomeInput"
                                    label="Address, street name, city..."
                                    variant="standard"
                                    onChange={handleAddressInputChange}
                                />
                            )}
                        />
                        <Button
                            className={`${className}Button`}
                            variant="contained"
                            onClick={searchButton}
                            disabled={searchButtonDisabled()}
                        >
                            Search
                        </Button>
                    </div>
                    <div className={`${className}Actions`}>
                        <RoomRadiusQueryComponent className={`${className}Select`} />
                        <UserLocationQueryComponent />
                    </div>
                </>
            )}
        </div>
    );
}
