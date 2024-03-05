import banner from '../assets/images/banner_2.avif';
import React, { useState } from 'react';

type TextFieldProps = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    styling?: React.CSSProperties;
};

export default function InputField(props: TextFieldProps) {
    return (
        <input
            type="text"
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder || ''}
            style={{
                border: 'none',
                borderBottom: '1px solid #B6BDC1',
                textAlign: 'left',
                padding: '8px',
                outline: 'none',
                ...props.styling,
            }}
        />
    );
}
