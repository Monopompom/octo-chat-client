import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Space} from "../../model/space";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Space[]>(`${environment.apiUrl}/space`);
  }

  getById(id: number) {
    return this.http.get<Space>(`${environment.apiUrl}/space/${id}`);
  }

  getUsersById(id: number) {
    return this.http.get<User[]>(`${environment.apiUrl}/space/${id}/users`);
  }

  register(space: Space) {
    return this.http.post(`${environment.apiUrl}/space/register`, space);
  }

  update(space: Space) {
    return this.http.put(`${environment.apiUrl}/space/${space.id}`, space);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/space/${id}`);
  }
}
