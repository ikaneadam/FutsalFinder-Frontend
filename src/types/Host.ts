import {Room} from "./Room";
import {Image} from "./Image";
import {User} from "./User";

export type Host = {
    uuid: string;
    users: User[];
    name: string;
    description?: string;
    rooms: Room[];
    images: Image[];
    iban?: string
    phoneNumber?: string
    email?: string
}