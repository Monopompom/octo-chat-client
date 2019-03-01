import {map} from 'rxjs/operators';
import {User} from "../../model/user";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, {'email': email, 'password': password})
            .pipe(map(
                data => {

                    if (data['success']) {

                        if (data['data'] && data['data']['token']) {
                            localStorage.setItem('currentUser', JSON.stringify(data['data']));
                            this.currentUserSubject.next(data['data']);
                        }

                        return true;
                    } else {
                        return null;
                    }
                }
            ));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
