import { TimeBlock } from './TimeBlock';
import { Room } from './Room';

export enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export type StandardAvailableDate = {
    uuid: string;
    dayOfWeek: DayOfWeek;
    room: Room;
    availabilityPeriods: TimeBlock[];
};

export type ReservedTimeBlock = {
    date: string;
    startTime: string;
    endTime: string;
    userUuid: string;
};
export type AvailableBookingTimes = {
    roomUUID: string;
    roomName: DayOfWeek;
    availableTimes: {
        dayOfWeek: DayOfWeek;
        availabilityPeriods: TimeBlock[];
    }[];
    reservedTimes: ReservedTimeBlock[];
};
