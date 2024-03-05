import {Room} from "./Room";
import {TimeBlock} from "./TimeBlock";
import {DayOfWeek} from "./StandardAvailableDate";

export type AdjustedAvailableDate = {
    uuid: string;
    dayOfWeek: DayOfWeek;
    date: string
    room: Room;
    availabilityPeriods: TimeBlock[];
}