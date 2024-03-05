import banner from '../assets/images/banner_2.avif';
import React, { useState } from 'react';

type SelectFieldProps = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
    className?: string;
    style?: any;
};

export default function SelectField(props: SelectFieldProps) {
    return (
        <select
            className={props.className}
            value={props.value}
            onChange={props.onChange}
            style={{
                border: 'none',
                borderBottom: '1px solid #B6BDC1',
                textAlign: 'left',
                outline: 'none',
                backgroundColor: 'transparent',
                ...props.style,
            }}
        >
            {props.placeholder && (
                <option value="" disabled>
                    {props.placeholder}
                </option>
            )}
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
