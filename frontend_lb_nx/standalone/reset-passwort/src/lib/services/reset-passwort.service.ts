import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswortService {

  private resetPasswordUrl = "http://192.168.0.105:8000/user/reset"  //{email}

  constructor(private http: HttpClient) { }

  resetPassword(email: string): Observable<any> {
    const payload = { email: email };
    return this.http.put(this.resetPasswordUrl+'/'+email, payload);
  }
}
