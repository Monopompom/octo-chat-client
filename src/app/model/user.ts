import {Space} from "./space";

export class User {
    id: number;
    firstName: string;
    secondName: string;
    middleName: string;
    nickname: string;
    email: string;
    password?: string;
    token?: string;
    registeredDate: string;
    modifiedDate: string;
    userSpaces: Space[];
    role: string;
    theme: string = "default";
}