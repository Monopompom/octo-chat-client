import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {User} from "../../model/user";
import {Location} from '@angular/common';
import {UserService} from "../../service/user/user.service";
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../service/alert/alert.service";
import {LoaderService} from "../../service/loader/loader.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SpaceService} from "../../service/space/space.service";
import {Role} from "../../model/role";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    loading = false;
    submitted = false;
    currentUser: User;
    userFromApi: User;
    isCollapsed = true;
    reloadTimeOut = 10000;
    createSpaceForm: FormGroup;

    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private spaceService: SpaceService,
        private loaderService: LoaderService,
        private authenticationService: AuthenticationService
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };

        this.currentUser = this.authenticationService.currentUserValue;

        this.route.queryParams.subscribe(
            queryParams => {
                this.reloadTimeOut = (queryParams && queryParams.reload) ? (parseInt(queryParams.reload) * 1000) : this.reloadTimeOut;
            }
        );
    }

    get csf() {
        return this.createSpaceForm.controls;
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(
            data => {

                if (data['success']) {
                    this.loaderService.hide();
                    this.userFromApi = data['data'];
                    this.location.replaceState(this.location.path().split('?')[0], '');
                }
            },
            error => {

                if (error.status === 0) {
                    let counter = this.reloadTimeOut / 1000;
                    let interval = setInterval(() => {

                        if (counter >= 0) {
                            this.alertService.error(`Connection error. Page will reload after ${counter} seconds. <a href="?reload=${counter}">Reload now</a>`, false, {
                                showAs: "toast",
                                dismissible: false
                            });
                            counter--;
                        }
                    }, 990);

                    setTimeout(() => {
                        clearInterval(interval);

                        this.router.navigate([], {queryParams: {reload: (this.reloadTimeOut / 1000 * 3)}});
                    }, this.reloadTimeOut);

                } else {
                    this.alertService.error(error.message);
                }
            }
        );

        this.createSpaceForm = this.formBuilder.group({
            name: ['', Validators.required],
            ownerId: [this.currentUser.id]
        });
    }

    onCreateSpaceSubmit() {
        this.submitted = true;

        if (this.createSpaceForm.invalid) {
            return;
        }

        this.loading = true;
        this.loaderService.show();

        this.spaceService.register(this.createSpaceForm.value)
            .pipe(first())
            .subscribe(
                data => {

                    if (data['success']) {
                        //TODO Append Dynamically and Update Local User
                        console.log(data['data']);
                    } else {
                        this.loading = false;
                        this.loaderService.hide();
                        this.alertService.error(data['error']);
                    }
                },
                error => {
                    this.loading = false;
                    this.loaderService.hide();
                    this.alertService.error(error.message);
                }
            );
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['sign-in']);
    }
}
