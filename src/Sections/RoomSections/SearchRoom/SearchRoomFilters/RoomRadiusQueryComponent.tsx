import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectField from '../../../../components/common/text/SelectField';
import { getUrlQuery } from '../../../../helpers/getUrlQuery';

type RoomRadiusQueryComponentProps = {
    className: string;
};
const possibleRadiuses = [
    { value: '500', label: '500 m' },
    { value: '1000', label: '1 km' },
    { value: '5000', label: '5 km' },
    { value: '10000', label: '10 km' },
    { value: '200000', label: '200 km' },
    { value: '', label: 'Anywhere' },
];

const RoomRadiusQueryComponent = (props: RoomRadiusQueryComponentProps) => {
    const [selectedRadius, setSelectedRadius] = useState('');
    const navigate = useNavigate();

    const handleRadiusSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const radius = event.target.value;
        setSelectedRadius(radius);
        const url = new URL(window.location.href);
        const urlUpdatedWithRadiusQuery = getUrlQuery(url, { radius: radius }, radius !== '');
        navigate(urlUpdatedWithRadiusQuery.fullUrl);
    };

    return (
        <>
            <SelectField
                className={props.className}
                value={selectedRadius}
                onChange={handleRadiusSelectChange}
                options={possibleRadiuses}
                placeholder="Radius"
            />
        </>
    );
};

export default RoomRadiusQueryComponent;
