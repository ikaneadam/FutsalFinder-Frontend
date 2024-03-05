import { TimeBlock } from '../../types/TimeBlock';

export function findExtremesTimeBlock(timeBlocks: TimeBlock[]): TimeBlock {
    let lowestStartTime = timeBlocks[0]?.startTime;
    let highestEndTime = timeBlocks[0]?.endTime;

    if (timeBlocks.length === 0) {
        return { startTime: lowestStartTime, endTime: highestEndTime };
    }

    for (const block of timeBlocks) {
        //maybe first convert to number
        if (block.startTime < lowestStartTime) {
            lowestStartTime = block.startTime;
        }
        if (block.endTime > highestEndTime) {
            highestEndTime = block.endTime;
        }
    }

    return { startTime: lowestStartTime, endTime: highestEndTime };
}
