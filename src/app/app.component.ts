import {Component} from '@angular/core';
import {User} from "./model/user";
import {AuthenticationService} from "./service/authentication/authentication.service";
import {Router} from "@angular/router";
import {Role} from "./model/role";
import {setTheme} from 'ngx-bootstrap/utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        setTheme('bs4');
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['sign-in']);
    }
}
