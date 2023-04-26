import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {BACKENDPATHS} from "../BACKENDPATHS";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // http login request
    login(username: string, password: string): Observable<string> {
        return this.http.post<{token: string}>(BACKENDPATHS.login, { username, password }).pipe(map(response => response.token));
    }
}
