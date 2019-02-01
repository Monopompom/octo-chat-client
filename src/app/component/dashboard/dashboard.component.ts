import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {User} from "../../model/user";
import {UserService} from "../../service/user/user.service";
import {first} from "rxjs/operators";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    currentUser: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(
            data => {

                if (data['success']) {
                    this.userFromApi = data['data'];
                }
            }
        );
    }
}
