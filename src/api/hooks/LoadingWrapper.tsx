import React, { ComponentType, ReactElement, useEffect, useState } from 'react';
import { HttpStatus } from './UseApiLayer';
import Spinner from '../../components/common/Spinner/spinner';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

//todo let it always looad minimal 3 seconds
type LoadingWrapperProps = {
    httpStatus: HttpStatus;
    statusCode?: number;
    data?: any;
    children: ReactElement | null;
    isReady?: boolean;
    displayError?: boolean;
    relative?: boolean;
};
const LoadingWrapper = (props: LoadingWrapperProps) => {
    const {
        httpStatus,
        statusCode,
        children,
        isReady = true,
        displayError = true,
        relative = false,
    } = props;
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const shouldShowLoader = httpStatus === HttpStatus.isLoading || !isReady || showLoader;

    if (shouldShowLoader) {
        return <Spinner relative={relative} />;
    }

    if (httpStatus === HttpStatus.isError && displayError) {
        return <ErrorPage statusCode={statusCode} />;
    }

    return <>{children}</>;
};

export default LoadingWrapper;
