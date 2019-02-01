import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {first} from "rxjs/operators";
import {AlertService} from "../../service/alert/alert.service";

@Component({
    selector: 'app-login.d-table.w-100.h-100.pt-5',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    spaceForm: FormGroup;
    loginForm: FormGroup;
    loading = false;
    space = false;
    submitted = false;
    returning: string;
    error = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) {

        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    get sf() {
        return this.spaceForm.controls;
    }

    get lf() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.route.data.subscribe(d => this.space = d.space);

        this.spaceForm = this.formBuilder.group({
            space: ['', Validators.required]
        });

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returning = this.route.snapshot.queryParams['r'] || '/';
    }

    onSpaceSubmit() {
        this.submitted = true;

        if (this.spaceForm.invalid) {
            return;
        }

        this.loading = true;
    }

    onLoginSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.lf.username.value, this.lf.password.value)
            .pipe(first())
            .subscribe(
                () => {
                    this.router.navigate([this.returning]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
