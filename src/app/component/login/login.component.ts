import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {first} from "rxjs/operators";
import {AlertService} from "../../service/alert/alert.service";
import {LoaderService} from "../../service/loader/loader.service";

@Component({
    selector: 'app-login.container.d-table.w-100.h-100.pt-5',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    space = false;
    loading = false;
    submitted = false;
    returning: string;
    loginForm: FormGroup;
    spaceForm: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private authenticationService: AuthenticationService
    ) {
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

        this.returning = this.route.snapshot.queryParams['r'] || '';
    }

    onFindSpaceSubmit() {
        this.submitted = true;

        if (this.spaceForm.invalid) {
            return;
        }

        this.loading = true;
        this.loaderService.show();
    }

    onLoginSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.loaderService.show();
        this.authenticationService.login(this.lf.username.value, this.lf.password.value)
            .pipe(first())
            .subscribe(
                () => {
                    this.loaderService.hide();
                    this.router.navigate([this.returning]);
                },
                error => {
                    this.loading = false;
                    this.loaderService.hide();
                    this.alertService.error(error.message);
                });
    }
}
