import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from "../service/authentication/authentication.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoaderService} from "../service/loader/loader.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private loaderService: LoaderService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {

            if (error.status === 401) {
                this.authenticationService.logout();

                location.reload(true);

                return;
            }

            let message = ((error.error && error.error.error) ? error.error.error : error.error) || error.message || error.statusText;

            if (error.status === 0) {
                this.loaderService.show("cloud_off");

                message = "Server is not available. Try again later";
            }

            if (error.status === 404) {
                message = "404. Oh nooo...";
            }

            let _error = {
                status: error.status,
                message: message
            };

            return throwError(_error);
        }))
    }
}