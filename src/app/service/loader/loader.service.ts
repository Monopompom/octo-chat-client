import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private subject = new Subject<any>();

    constructor() {
    }

    show(type?) {
        this.subject.next({isVisible: true, type: type})
    }

    hide() {
        this.subject.next({isVisible: false})
    }

    getVisibility() {
        return this.subject.asObservable();
    }
}
