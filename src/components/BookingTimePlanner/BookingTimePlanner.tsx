import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AvailableBookingTimes, ReservedTimeBlock } from '../../types/StandardAvailableDate';
import './bookingTimePLanner.css';
import {
    calculateOpeningHours,
    OpeningDay,
    OpeningHoursWeek,
} from '../../helpers/TimeBlocks/calculateOpeningHours';
import { determineDeviceType, useViewport } from '../../helpers/UseViewPort';
import { isTimeSlotBetweenTimeBlock } from '../../helpers/TimeBlocks/isHourBetweenTimeBlock';
import { isDateStringEqualToDate } from '../../helpers/Dates/IsDateStringEqualToDate';
import { TimeBlock } from '../../types/TimeBlock';
import { Box, Typography } from '@mui/material';
import { parseAddressToString } from '../../helpers/parseAddressToString';
export type BookingTimePlannerProps = {
    availableBookingTimes: AvailableBookingTimes;
};

export default function BookingTimePlanner(props: BookingTimePlannerProps) {
    const { availableBookingTimes } = props;
    const weeksBookingTimes = calculateOpeningHours(availableBookingTimes);
    const { width } = useViewport();
    const [toggleHourView, setToggleHourView] = useState(false);

    const getCurrentUser = () => {
        //todo real implemattion
        return {
            uuid: 'f47581b2-0690-4d21-9272-9a2a12e6b57b',
        };
    };

    const getHours = () => {
        if (toggleHourView) {
            return Array.from({ length: 24 }, (_, i) => i);
        }
        return Array.from({ length: 17 }, (_, i) => i + 7);
    };

    const actionBar = (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderBottom: '1px solid #f2f2f2',
            }}
        >
            <div style={{ position: 'relative' }}>
                <button
                    onClick={() => {
                        setToggleHourView(!toggleHourView);
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0',
                        padding: '0 16px',
                        border: 'none',
                        borderLeft: '1px solid #f2f2f2',
                        borderRight: '1px solid #f2f2f2',
                        backgroundColor: 'transparent',
                        height: '40px',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                >
                    <span>{toggleHourView ? 'Contract' : 'Expand'}</span>
                    <KeyboardArrowDownIcon fontSize="small" sx={{ color: '#335fff' }} />
                </button>
            </div>
        </div>
    );

    const legendaBar = () => {
        return (
            <div className="legendaItems">
                <Box className="legendaItem">
                    <Typography variant="body2" color="text.main">
                        Available
                    </Typography>
                </Box>
                <Box
                    className="legendaItem"
                    sx={{
                        '&::before': {
                            backgroundColor: '#879199',
                        },
                    }}
                >
                    <Typography variant="body2" color="text.main">
                        unavailable
                    </Typography>
                </Box>
                <Box
                    className="legendaItem"
                    sx={{
                        '&::before': {
                            backgroundColor: '#e04444',
                        },
                    }}
                >
                    <Typography variant="body2" color="text.main">
                        Reserved
                    </Typography>
                </Box>
                <Box
                    className="legendaItem"
                    sx={{
                        '&::before': {
                            backgroundColor: '#325DF9',
                        },
                    }}
                >
                    <Typography variant="body2" color="text.main">
                        Your bookings
                    </Typography>
                </Box>
            </div>
        );
    };

    const handleBooking = (date: Date, timeSlot: { startTime: number; endTime: number }) => {};

    const isSlotAlreadyReserved = (
        date: Date,
        timeSlot: { startTime: number; endTime: number }
    ): [boolean, ReservedTimeBlock | null] => {
        for (let i = 0; i < availableBookingTimes.reservedTimes.length; i++) {
            const reservedTimeBlock = availableBookingTimes.reservedTimes[i];
            if (!isDateStringEqualToDate(reservedTimeBlock.date, date)) {
                continue;
            }

            if (isTimeSlotBetweenTimeBlock(reservedTimeBlock, timeSlot)) {
                return [true, reservedTimeBlock];
            }
        }
        return [false, null];
    };

    const isSlotBetweenOpeningHours = (
        currentDateOpeningDates: OpeningDay,
        timeSlot: { startTime: number; endTime: number }
    ) => {
        for (let i = 0; i < currentDateOpeningDates.openingHours.length; i++) {
            const timeBlock = currentDateOpeningDates.openingHours[i];
            if (isTimeSlotBetweenTimeBlock(timeBlock, timeSlot)) {
                return true;
            }
        }
        return false;
    };

    const isSlotAvailable = (
        date: Date,
        timeSlot: { startTime: number; endTime: number }
    ): [boolean, ReservedTimeBlock | null] => {
        const currentDateOpeningDates = weeksBookingTimes[date.getDay()];
        if (currentDateOpeningDates.openingHours.length === 0) {
            return [false, null];
        }

        const [isReserved, reservedTimeBlock] = isSlotAlreadyReserved(date, timeSlot);
        if (isReserved) return [false, reservedTimeBlock];

        return [isSlotBetweenOpeningHours(currentDateOpeningDates, timeSlot), null];
    };

    const renderAvailabilitySlot = (
        date: Date,
        timeSlot: { startTime: number; endTime: number },
        style = {}
    ) => {
        const [slotAvailable, reservedTimeSlot] = isSlotAvailable(date, timeSlot);
        if (slotAvailable) {
            return (
                <div
                    key={`${timeSlot.startTime}-${date.getDay()}`}
                    className="availabilitySlot"
                    onClick={() => {
                        handleBooking(date, timeSlot);
                    }}
                ></div>
            );
        }

        // this calculation should be kept up in the loop so we dont have to do it mutliple times
        const isPreviousAvailable = !isSlotAvailable(date, {
            startTime: timeSlot.startTime - 1,
            endTime: timeSlot.endTime - 1,
        })[0];
        const isNextAvailable = !isSlotAvailable(date, {
            startTime: timeSlot.startTime + 1,
            endTime: timeSlot.endTime + 1,
        })[0];

        return (
            <div
                key={`${timeSlot.startTime}-${date.getDay()}`}
                className={createClassNameOutOfReserveTimeSlot(reservedTimeSlot)}
                style={{ ...createBorderStyling(isPreviousAvailable, isNextAvailable), ...style }}
            ></div>
        );
    };

    const createClassNameOutOfReserveTimeSlot = (reservedTimeSlot: null | ReservedTimeBlock) => {
        if (reservedTimeSlot === null) {
            return 'unAvailableSlot';
        }

        if (getCurrentUser().uuid === reservedTimeSlot?.userUuid) {
            return 'mineSlot';
        }

        return 'reservedSlot';
    };

    const createBorderStyling = (isPreviousAvailable: boolean, isNextAvailable: boolean) => {
        if (isPreviousAvailable && isNextAvailable) return {};

        if (!isPreviousAvailable && !isNextAvailable)
            return {
                borderRadius: '10px',
            };

        if (isPreviousAvailable)
            return {
                borderRadius: '0 10px 10px 0',
            };

        if (isNextAvailable) {
            return {
                borderRadius: '10px 0 0 10px',
            };
        }

        return {};
    };

    const renderAvailabilitySlots = () => {
        return (
            <div className="availabilitySlots">
                {getBookingDays().map((day: Date) => (
                    <div key={`${day.getDay()}`} className="availabilitySloty">
                        {getHours().map((hour: number, index) => {
                            let style = {};

                            if (index === 0) {
                                style = {
                                    borderRadius: '10px 0 0 10px',
                                };
                            }

                            if (index === getHours().length - 1) {
                                style = {
                                    borderRadius: '0 10px 10px 0',
                                };
                            }
                            const test = {
                                startTime: hour,
                                endTime: hour + 1,
                            };
                            return <>{renderAvailabilitySlot(day, test, style)}</>;
                        })}
                    </div>
                ))}
            </div>
        );
    };

    function formatDate(date: any) {
        const options = { weekday: 'long' };
        return date.toLocaleDateString('en-US', options);
    }

    const getBookingDays = () => {
        const today = new Date();
        const next6Days = Array.from({ length: 6 }, (_, i) => {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i + 1);
            return nextDay;
        });
        return [today, ...next6Days];
    };

    return (
        <div className="bookingPlanner">
            {actionBar}
            <div className="bookingTimes">
                <div className="bookingTimesDays">
                    <div className="bookingTimesDay"></div>
                    {getBookingDays().map((day, index) => (
                        <div
                            key={index}
                            className="bookingTimesDay"
                            style={{ color: index === 0 ? 'black' : '#999999' }}
                        >
                            {index === 0 ? 'Today' : formatDate(day)}
                        </div>
                    ))}
                </div>

                <div className="availabilityGridLines">
                    <div className="availabilityHours">
                        {getHours().map((i) => {
                            return (
                                <div key={i} className="availabilityHour">
                                    {i}
                                </div>
                            );
                        })}
                    </div>
                    {renderAvailabilitySlots()}
                </div>
            </div>
            {legendaBar()}
        </div>
    );
}
