import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {first} from "rxjs/operators";
import {AlertService} from "../../service/alert/alert.service";
import {UserService} from "../../service/user/user.service";

@Component({
    selector: 'app-register.d-table.w-100.h-100.pt-5',
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
        private authenticationService: AuthenticationService,
    ) {

        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.returning = this.route.snapshot.queryParams['r'] || '/';
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {

                    if (!data) {
                        this.alertService.success('Server responded with an error', true);
                        this.loading = false;
                        return;
                    }

                    if (data['success']) {

                        this.authenticationService.login(this.f.email.value, this.f.password.value)
                            .pipe(first())
                            .subscribe(
                                data => {

                                    if (data) {
                                        this.alertService.success('Registration is successful', true);
                                        this.router.navigate(['']);
                                    } else {
                                        this.alertService.success('Server responded with an error', true);
                                        this.router.navigate(['sign-in']);
                                    }
                                },
                                error => {
                                    this.alertService.error(error);
                                    this.loading = false;
                                }
                            );
                    } else {
                        this.alertService.error(data['error']);
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }
}
