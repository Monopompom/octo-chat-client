import {User} from "./user";

export class Space {
    id: number;
    name: string;
    ownerId: number;
    registeredDate: string;
    modifiedDate: string;
    spaceUsers: User[];
}