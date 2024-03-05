import { AvailableBookingTimes } from '../../types/StandardAvailableDate';
import { TimeBlock } from '../../types/TimeBlock';

export type OpeningDay = {
    dayName: string;
    openingHours: TimeBlock[];
};

export type OpeningHoursWeek = {
    [key: number]: OpeningDay;
};

export function calculateOpeningHours(
    availableBookingTimes: AvailableBookingTimes
): OpeningHoursWeek {
    const openingHoursDays: OpeningHoursWeek = {
        0: {
            dayName: 'Sunday',
            openingHours: [],
        },
        1: {
            dayName: 'Monday',
            openingHours: [],
        },
        2: {
            dayName: 'Tuesday',
            openingHours: [],
        },
        3: {
            dayName: 'Wednesday',
            openingHours: [],
        },
        4: {
            dayName: 'Thursday',
            openingHours: [],
        },
        5: {
            dayName: 'Friday',
            openingHours: [],
        },
        6: {
            dayName: 'Saturday',
            openingHours: [],
        },
    };

    for (const availableTimes of availableBookingTimes.availableTimes) {
        if (!(availableTimes.dayOfWeek in openingHoursDays)) {
            continue;
        }
        openingHoursDays[availableTimes.dayOfWeek].openingHours.push(
            ...availableTimes.availabilityPeriods
        );
    }
    return openingHoursDays;
}
