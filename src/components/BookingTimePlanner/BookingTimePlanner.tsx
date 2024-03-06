import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState } from 'react';
import { AvailableBookingTimes, ReservedTimeBlock } from '../../types/StandardAvailableDate';
import './bookingTimePLanner.css';
import { calculateOpeningHours, OpeningDay } from '../../helpers/TimeBlocks/calculateOpeningHours';
import { useViewport } from '../../helpers/UseViewPort';
import { isTimeSlotBetweenTimeBlock } from '../../helpers/TimeBlocks/isHourBetweenTimeBlock';
import { isDateStringEqualToDate } from '../../helpers/Dates/IsDateStringEqualToDate';
import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export type BookingTimePlannerProps = {
    availableBookingTimes: AvailableBookingTimes;
};

type BookingSlot = {
    isAvailable: boolean;
    reservedTimeBlock: ReservedTimeBlock | null;
    timeSlot: { startTime: number; endTime: number };
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

    const getBookingDays = () => {
        const today = new Date();
        const next6Days = Array.from({ length: 6 }, (_, i) => {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i + 1);
            return nextDay;
        });
        return [today, ...next6Days];
    };

    const getBookingSlots = (day: Date): { bookingSlot: BookingSlot; className: string }[] => {
        return getHours().map((hour: number, index) => {
            const currentTimeSlot = {
                startTime: hour,
                endTime: hour + 1,
            };
            const [isCurrentSlotAvailable, reservedTimeSlot] = isSlotAvailable(
                day,
                currentTimeSlot
            );
            const timeSlotClassName = createTimeSlotClassName(
                isCurrentSlotAvailable,
                reservedTimeSlot
            );
            return {
                bookingSlot: {
                    isAvailable: isCurrentSlotAvailable,
                    reservedTimeBlock: reservedTimeSlot,
                    timeSlot: currentTimeSlot,
                },
                className: timeSlotClassName,
            };
        });
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
                    <span>{toggleHourView ? 'Collapse' : 'Expand'}</span>
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
        isAvailable: boolean,
        className: string,
        style: any = {}
    ) => {
        if (isAvailable) {
            return (
                <div
                    key={`${timeSlot.startTime}`}
                    className={className}
                    onClick={() => {
                        handleBooking(date, timeSlot);
                    }}
                ></div>
            );
        }

        return <div key={timeSlot.startTime} style={style} className={className}></div>;
    };

    const createSlotBorderStyling = (adjacentSlotClasses: {
        prevClassName: string;
        currentClassName: string;
        nextClassName: string;
    }) => {
        const { prevClassName, currentClassName, nextClassName } = adjacentSlotClasses;
        const leftBorderStyle = {
            borderRadius: '10px 0 0 10px',
        };
        const rightBorderStyle = {
            borderRadius: '0 10px 10px 0',
        };
        const leftAndRightBorderStyle = {
            borderRadius: '10px',
        };

        if (prevClassName === '') {
            return leftBorderStyle;
        }

        if (nextClassName === '') {
            return rightBorderStyle;
        }

        if (prevClassName !== currentClassName && nextClassName !== currentClassName) {
            return leftAndRightBorderStyle;
        }

        if (prevClassName !== currentClassName) {
            return leftBorderStyle;
        }

        if (nextClassName !== currentClassName) {
            return rightBorderStyle;
        }
        return {};
    };

    const renderAvailabilitySlots = () => {
        return (
            <div className="availabilitySlots">
                {getBookingDays().map((day: Date, i) => {
                    const slots = getBookingSlots(day);
                    return (
                        <div key={i} className="availabilitySloty">
                            {slots.map(
                                (
                                    slot: { bookingSlot: BookingSlot; className: string },
                                    i: number
                                ) => {
                                    const { bookingSlot, className } = slot;
                                    const prevClassName = i > 0 ? slots[i - 1].className : '';
                                    const nextClassName =
                                        i === slots.length - 1 ? '' : slots[i + 1].className;

                                    console.log({
                                        prevClassName,
                                        currentClassName: className,
                                        nextClassName,
                                    });

                                    const slotBorderStyling = createSlotBorderStyling({
                                        prevClassName,
                                        currentClassName: className,
                                        nextClassName,
                                    });

                                    return renderAvailabilitySlot(
                                        day,
                                        bookingSlot.timeSlot,
                                        bookingSlot.isAvailable,
                                        className,
                                        slotBorderStyling
                                    );
                                }
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const createTimeSlotClassName = (
        isAvailable: boolean,
        reservedTimeSlot: null | ReservedTimeBlock
    ) => {
        if (isAvailable) {
            return 'availabilitySlot';
        }
        if (reservedTimeSlot === null) {
            return 'unAvailableSlot';
        }

        if (getCurrentUser().uuid === reservedTimeSlot?.userUuid) {
            return 'mineSlot';
        }

        return 'reservedSlot';
    };

    function formatDate(date: any) {
        const options = { weekday: 'long' };
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <div className="bookingPlanner">
            {actionBar}
            <div className="bookingTimes">
                <div className="bookingTimesDays">
                    <div className="bookingTimesDay"></div>
                    {getBookingDays().map((day, i) => (
                        <div
                            key={i}
                            className="bookingTimesDay"
                            style={{ color: i === 0 ? 'black' : '#999999' }}
                        >
                            {i === 0 ? 'Today' : formatDate(day)}
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
