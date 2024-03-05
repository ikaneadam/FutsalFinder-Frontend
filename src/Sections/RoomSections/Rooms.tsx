import { Room } from '../../types/Room';
import React, { useCallback, useEffect, useState } from 'react';
import useApiLayer, { HttpStatus } from '../../api/hooks/UseApiLayer';
import { getRooms } from '../../api/RoomsApi';
import { Pagination } from '../../types/Pagination';
import LoadingWrapper from '../../api/hooks/LoadingWrapper';
import RoomCard from './RoomCard';
import { determineDeviceType, useViewport } from '../../helpers/UseViewPort';
import ReactPaginate from 'react-paginate';
import { DistanceQuery } from '../../types/DistanceQuery';
import { toast, Toaster } from 'react-hot-toast';

export type RoomsProps = {
    distanceQuery?: DistanceQuery;
};
export default function Rooms(props: RoomsProps) {
    const { distanceQuery } = props;
    const { width } = useViewport();
    const [hasUsedPaginator, setHasUsedPaginator] = useState(false);
    const { isMobile, isTablet } = determineDeviceType(width);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;
    const fetchRooms = useCallback(() => {
        return getRooms(currentPage, itemsPerPage, distanceQuery);
    }, [currentPage, distanceQuery?.latitude, distanceQuery?.latitude, distanceQuery?.radius]);

    const { data, status, statusCode } = useApiLayer<Pagination<Room>>(fetchRooms); //TOODO FIND OUT WHY THIS HAPPENS TWICE

    const getPageCount = () => {
        if (status === HttpStatus.isLoading) {
            return 0;
        }
        return Math.ceil(data?.totalRecords! / itemsPerPage);
    };

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
        setHasUsedPaginator(true);
    };

    useEffect(() => {
        if (!hasUsedPaginator) {
            return;
        }
        if (status === HttpStatus.isError || status === HttpStatus.isSuccess) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, [status, data]);

    useEffect(() => {
        const isDataLoaded = status === HttpStatus.isSuccess && data !== null;
        if (isDataLoaded && data?.data.length === 0) {
            toast.error('No courts found, with current filters', { duration: 1500 });
        }
    }, [data?.data?.length, status]);

    const getGridTemplateColumns = () => {
        //todo lol
        if (isMobile) {
            return '1fr';
        }

        if (isTablet) {
            return '1fr 1fr';
        }

        if (width < 1400) {
            return '1fr 1fr 1fr';
        }

        return '1fr 1fr 1fr 1fr';
    };

    const roomViews = () => {
        const rooms: Room[] | undefined = data?.data;
        return (
            <ul
                style={{
                    minHeight: '50vh',
                    display: 'grid',
                    gridTemplateColumns: getGridTemplateColumns(),
                    gridRowGap: '10px',
                    gridColumnGap: '10px',
                }}
            >
                {rooms?.map((room: Room, index: number) => {
                    return (
                        <RoomCard
                            roomUUID={room.uuid}
                            imageUrls={room.images}
                            name={room.name}
                            address={room.address}
                            distance={room.distance}
                            key={index}
                        />
                    );
                })}
            </ul>
        );
    };

    return (
        <div
            style={{
                position: 'relative',
                minHeight: '80vh',
            }}
        >
            <Toaster />
            <LoadingWrapper httpStatus={status} statusCode={statusCode} isReady={true}>
                {roomViews()}
            </LoadingWrapper>
            <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={getPageCount()}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
}
