import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SpaceService} from "../../service/space/space.service";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {User} from "../../model/user";
import {Space} from "../../model/space";
import {SocketService} from "../../service/socket/socket.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from "../../model/message";
import {MessageService} from "../../service/message/message.service";
import {MessageComponent} from "../message/message.component";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
    space: Space;
    spaceName = "";
    submitted = false;
    currentUser: User;
    chatForm: FormGroup;
    socketService: SocketService;
    @ViewChild('messages', {
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private spaceService: SpaceService,
        private messageService: MessageService,
        private authenticationService: AuthenticationService,
    ) {
        this.spaceName = this.route.snapshot.paramMap.get('space');
        this.currentUser = this.authenticationService.currentUserValue;

        this.currentUser.userSpaces.forEach((space) => {

            if (space.name === this.spaceName) {
                this.space = space;
            }
        });

        if (!this.space) {
            this.router.navigate(["/"]);
        }
    }

    get cf() {
        return this.chatForm.controls;
    }

    ngOnInit() {
        this.messageService.setRootViewContainerRef(this.viewContainerRef);
        this.socketService = new SocketService(this.space, this.currentUser);

        this.chatForm = this.formBuilder.group({
            message: ['', Validators.required]
        });

        this.socketService.getVisibility().subscribe((message: Message) => {
            this.messageService.addMessage(message);
        })
    }

    onChatSubmit() {
        this.submitted = true;

        if (this.chatForm.invalid) {
            return;
        }

        let message = new Message();

        message.sender = this.currentUser;
        message.space = this.space;
        message.message = this.cf.message.value;

        this.socketService.sendMessage(message);
    }
}
