import { TimeBlock } from '../../types/TimeBlock';

export function isTimeSlotBetweenTimeBlock(
    timeBlock: TimeBlock,
    timeSlot: { startTime: number; endTime: number }
): boolean {
    // Parse time block strings to date objects for today
    const currentDate = new Date();
    const blockStartTime = parseTimeToDate(currentDate, timeBlock.startTime);
    const blockEndTime = parseTimeToDate(currentDate, timeBlock.endTime);

    // Create date objects for time slots, assuming they represent hours of today
    const slotStartTime = new Date(currentDate.setHours(timeSlot.startTime, 0, 0, 0));
    const slotEndTime = new Date(currentDate.setHours(timeSlot.endTime, 0, 0, 0));

    // Check if the time slot is within the time block
    return slotStartTime >= blockStartTime && slotEndTime <= blockEndTime;
}

function parseTimeToDate(referenceDate: Date, time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return new Date(referenceDate.setHours(hours, minutes, seconds, 0));
}
