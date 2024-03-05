type AvailabilityPeriod = {
    startTime: string;
    endTime: string;
};

type RoomAvailability = {
    dayOfWeek: number;
    availabilityPeriods: AvailabilityPeriod[];
};

export type BookingTimes = {
    roomUUID: string;
    roomName: string;
    availableTimes: RoomAvailability[];
};

export enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}
