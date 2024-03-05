import {User} from "./User";
import {Room} from "./Room";

export type BookingReservation = {
    uuid: string;
    user: User;
    userUuid: string;
    room: Room;
    roomUuid: string;
    cost: number;
    date: string;
    startTime: string;
    endTime: string;
    isRescheduled: boolean;
    isCanceled: boolean;
}