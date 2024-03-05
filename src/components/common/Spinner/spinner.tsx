import React from 'react';
import './Spinner.css';

export type SpinnerProps = {
    relative?: boolean;
};

export default function Spinner(props: SpinnerProps) {
    const { relative = false } = props;

    const styling = {
        border: '5px solid rgba(0, 0, 0, 0.1)',
        borderTop: '5px solid #474a4f',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 2s linear infinite',
    };

    const absoluteSpinner = (
        <>
            <div style={{ minHeight: '80vh' }}>
                <div
                    style={{
                        ...styling,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    className="spinner"
                ></div>
            </div>
        </>
    );

    const relativeSpinner = (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
                className="spinnerWrapper"
            >
                <div style={{ ...styling }} className="spinner"></div>
            </div>
        </>
    );

    return <>{relative ? relativeSpinner : absoluteSpinner}</>;
}
