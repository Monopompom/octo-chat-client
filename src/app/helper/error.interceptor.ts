import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from "../service/authentication/authentication.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {

            if (error.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
            }

            let _error = error.error || error.message || error.statusText;

            if (error.status === 0) {
                _error = "Server is not available";
            }

            return throwError(_error);
        }))
    }
}