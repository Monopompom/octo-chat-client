import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {NavigationStart, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {

            if (event instanceof NavigationStart) {

                if (this.keepAfterNavigationChange) {
                    this.keepAfterNavigationChange = false;
                } else {
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'success', message: message});
    }

    info(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'info', message: message});
    }

    error(message: string, keepAfterNavigationChange = false, options?) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'danger', message: message, options: options});
    }

    warning(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({type: 'warning', message: message});
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
