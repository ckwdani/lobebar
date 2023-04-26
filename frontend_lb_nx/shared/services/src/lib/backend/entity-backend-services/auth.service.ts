import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {BACKENDPATHS} from "../BACKENDPATHS";
import {User} from "@frontend-lb-nx/shared/entities";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // http login request
    login(username: string, password: string): Observable<string> {
        return this.http.post<{token: string}>(BACKENDPATHS.login, { username, password }).pipe(map(response => response.token));
    }

  // http login request
    register(user: User): Observable<string> {
    return this.http.post<{user: string}>(BACKENDPATHS.register, user).pipe(map(response => response.user));
  }

    getUser(token: string): Observable<User>{
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + token}),
      };
      return this.http.get<User>(BACKENDPATHS.getUser, httpOptions);

    }
}
