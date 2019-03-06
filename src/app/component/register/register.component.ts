import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {first} from "rxjs/operators";
import {AlertService} from "../../service/alert/alert.service";
import {UserService} from "../../service/user/user.service";
import {LoaderService} from "../../service/loader/loader.service";

@Component({
    selector: 'app-register.container.d-table.w-100.h-100.pt-5',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returning: string;
    error = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private loaderService: LoaderService,
        private authenticationService: AuthenticationService,
    ) {
    }

    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.returning = this.route.snapshot.queryParams['r'] || '';
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.loaderService.show();
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {

                    if (!data) {
                        this.loading = false;
                        this.loaderService.hide();
                        this.alertService.error('Server responded with an error', true);
                        return;
                    }

                    if (data['success']) {

                        this.authenticationService.login(this.f.email.value, this.f.password.value)
                            .pipe(first())
                            .subscribe(
                                data => {

                                    if (data) {
                                        this.loading = false;
                                        this.loaderService.hide();
                                        this.alertService.success('Registration is successful', true);
                                        this.router.navigate(['dashboard']);
                                    } else {
                                        //TODO Case Of Error?
                                        this.alertService.error('Server responded with an error', true);
                                        this.router.navigate(['sign-in']);
                                    }
                                },
                                error => {
                                    this.loading = false;
                                    this.loaderService.hide();
                                    this.alertService.error(error.message);
                                }
                            );
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
}
