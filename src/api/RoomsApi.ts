import api from './api';
import { DistanceQuery } from '../types/DistanceQuery';
import parseObjectToQueryString from '../helpers/parseObjectToQueryString';

const URLS = {
    getRoomsUrl: 'rooms',
};

export const getRooms = async (page: number, limit: number, distanceQuery?: DistanceQuery) => {
    const getRoomsURL = URLS.getRoomsUrl;
    let paginatedGetRoomURL = `${getRoomsURL}?page=${page}&limit=${limit}`;

    if (distanceQuery) {
        const distanceQueryString = parseObjectToQueryString(distanceQuery);
        paginatedGetRoomURL += distanceQueryString;
    }
    return api.get(paginatedGetRoomURL);
};

export const getRoom = async (roomUUID: string) => {
    const getRoomURL = URLS.getRoomsUrl;
    return api.get(`${getRoomURL}/${roomUUID}`);
};

export const getAvailableBookingTimes = async (roomUUID: string) => {
    const getRoomURL = URLS.getRoomsUrl;
    return api.get(`${getRoomURL}/${roomUUID}/get-available-booking-times`);
};
