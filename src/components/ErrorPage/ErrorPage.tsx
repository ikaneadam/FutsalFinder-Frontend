import React from 'react';
import './Error.css';

type ErrorProps = {
    message?: string;
    statusCode?: number;
    lightMode?: boolean;
};

export default function ErrorPage(props: ErrorProps) {
    const { message, statusCode, lightMode = false } = props;
    return (
        <div className="errorWrapper">
            <div className="Error">
                {statusCode && <p>Status code: {statusCode}</p>}
                {message ? (
                    <p>{message}</p>
                ) : (
                    <>
                        <p>something went wrong,</p>
                        <p>try again later.</p>
                    </>
                )}
            </div>
        </div>
    );
}
