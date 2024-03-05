import { Address } from './Address';
import { Image } from './Image';
import { Host } from './Host';
import { BookingReservation } from './BookingReservation';
import { AdjustedAvailableDate } from './AdjustedAvailableDate';
import { StandardAvailableDate } from './StandardAvailableDate';

export type Room = {
    uuid: string;
    name: string;
    description?: string;
    hourlyRate?: number;
    address: Address;
    images: Image[];
    host: Host;
    hostUuid: string;
    bookingReservations: BookingReservation[];
    standardDates: StandardAvailableDate[];
    adjustedDates: AdjustedAvailableDate[];
    distance?: number;
};
