import {Injectable} from '@angular/core';
import {AuthenticationService} from "../service/authentication/authentication.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;

        if (currentUser) {
            return true;
        }

        this.router.navigate(['/sign-in'], {queryParams: {r: state.url}});
    }
}