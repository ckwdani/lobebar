import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";

export interface PasswordResetExtra {
  backendBasePath: string;
  backendEmailPath: string;
  backendResetPath: string;
  routeSuccess: string;
  backendCheckPath?: string;
}
@Injectable({
  providedIn: 'root'
})
export class ResetPasswortService {

  private resetPasswordUrl = this.backendData.backendEmailPath  //{email}

  constructor(private http: HttpClient, @Inject('pw-reset-extra') public backendData: PasswordResetExtra) {
  }

  sendMail(email: string): Observable<any> {
    // const payload = { email: email };
    console.log(this.resetPasswordUrl+'/'+email)
    return this.http.put(this.resetPasswordUrl+'/'+email, {});
  }

  resetPassword(code: string, password: string): Observable<any> {
    const payload = {password: password };
    return this.http.put(this.backendData.backendResetPath+"/"+code, payload);
  }


  checkCode(code: string): Observable<boolean> {
    return this.http.get(this.backendData.backendCheckPath+"/"+code, {responseType: 'text'}).pipe(map((res: any) => {
      console.log(res)
        return res !== undefined && res !== null && res !== '';
    }), catchError(err => [404, 410].includes(err.code) ? of(false) : throwError(err)));
  }
}
