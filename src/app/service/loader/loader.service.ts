import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private subject = new Subject<any>();

    constructor() {
    }

    show(type?) {
        this.subject.next({type: type})
    }

    hide() {
        this.subject.next(false)
    }

    getVisibility(): Observable<any> {
        return this.subject.asObservable();
    }
}
