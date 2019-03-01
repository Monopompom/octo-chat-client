import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {User} from "../../model/user";
import {AuthenticationService} from "../authentication/authentication.service";
import {Message} from "../../model/message";
import {Space} from "../../model/space";
import {listener} from "@angular/core/src/render3";
import {Subject} from "rxjs";

const CHAT_SERVER_URL = 'http://127.0.0.1:8585/octo-chat';
const CHAT_SERVER_CHAT_ROOMS_URL = '/chatrooms';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket;
    private space: Space;
    private currentUser: User;
    private subject = new Subject<any>();

    constructor(
        space: Space,
        user: User
    ) {
        this.space = space;
        this.currentUser = user;

        this.initSocket();
    }

    initSocket(): void {
        let ws = new SockJS(CHAT_SERVER_URL);
        this.socket = Stomp.over(ws);
        this.socket.debug = null;
        this.socket.connect(
            {Authorization: `Bearer ${this.currentUser.token}`},
            this.startListener.bind(this),
            this.handleErrors.bind(this)
        );

        return this.socket;
    }

    startListener(): void {
        this.socket.subscribe(
            CHAT_SERVER_CHAT_ROOMS_URL + "/" + this.space.name,
            this.onMessageReceived.bind(this)
        );
    }

    sendMessage(message: Message): void {
        message.sender.userSpaces = [];
        message.space.spaceUsers = [];

        this.socket.send(
            "/app/chat.message",
            {Authorization: `Bearer ${this.currentUser.token}`},
            JSON.stringify(message)
        );
    }

    onMessageReceived(payload) {
        this.subject.next(new Message().parse(payload.body));
    }

    handleErrors(error): void {
        console.log(error);
    }

    reconnect(): void {
        this.initSocket();
    }

    getVisibility() {
        return this.subject.asObservable();
    }
}
