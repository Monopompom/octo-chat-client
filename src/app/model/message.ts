import {User} from "./user";
import {Space} from "./space";

export class Message {
    sender: User;
    space: Space;
    message: string;

    parse(payload) {
        Object.assign(this, JSON.parse(payload));
        return this;
    }
}