import { AvailableBookingTimes } from '../types/StandardAvailableDate';
import { calculateOpeningHours } from '../helpers/TimeBlocks/calculateOpeningHours';
import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { TimeBlock } from '../types/TimeBlock';
import { findExtremesTimeBlock } from '../helpers/TimeBlocks/FindExtremes';

export type OpeningHoursProps = {
    availableBookingTimes?: AvailableBookingTimes | null;
};

export default function OpeningHours(props: OpeningHoursProps) {
    const { availableBookingTimes } = props;

    const formatTime = (time: string) => {
        const timeChunks = time.split(':');
        return `${timeChunks[0]}:${timeChunks[1]}`;
    };
    const formatTimeBlock = (timeBlock: TimeBlock) => {
        return `${formatTime(timeBlock.startTime)} - ${formatTime(timeBlock.endTime)}`;
    };

    const formatTimeBlocks = (timeBlocks: TimeBlock[]) => {
        if (timeBlocks.length === 0) {
            return 'Closed';
        }

        const extremesTimeBlock = findExtremesTimeBlock(timeBlocks);
        return formatTimeBlock(extremesTimeBlock);
    };

    const renderOpeningHours = () => {
        const openingHoursWeek = calculateOpeningHours(availableBookingTimes!);
        return (
            <Box
                sx={{
                    padding: '5px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    lineHeight: '1.2',
                }}
            >
                <div
                    style={{
                        padding: '12px',
                        fontSize: '18px',
                        fontWeight: '600',
                        lineHeight: '1.2',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        borderBottom: '1px solid #e7e9eb',
                    }}
                >
                    Opening hours
                </div>
                <List sx={{ margin: '0 auto', width: '95%' }}>
                    <ul
                        style={{
                            listStyle: 'none',
                            margin: '-8px 0',
                            borderTop: '1px solid #E7E9EB',
                        }}
                    >
                        {Object.values(openingHoursWeek).map((day, index) => (
                            <li
                                key={index}
                                style={{
                                    padding: '8px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom:
                                        index !== Object.values(openingHoursWeek).length - 1
                                            ? '1px solid #E7E9EB'
                                            : 'none',
                                }}
                            >
                                <div>
                                    <p>{day.dayName}</p>
                                </div>
                                <div>
                                    <p>{formatTimeBlocks(day.openingHours)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </List>
            </Box>
        );
    };
    return <>{availableBookingTimes && <div>{renderOpeningHours()}</div>}</>;
}
