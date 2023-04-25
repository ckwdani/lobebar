import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpErrorHandlerService} from "./http-error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class BaseCommunicatorService<T> {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem(Constants.localStToken)}),
  };
  constructor(protected http: HttpClient, private errorHandler: HttpErrorHandlerService) {}


  get<ALT>(path: string, route: boolean = true): Observable<T>{
    // has to be done if the localstroage has changed
    this.setHeaders();
    const response = this.http.get<T>(path, this.httpOptions);
    return this.genGenerObs(response, route);
  }
  post<ALT>(path: string, body: T | ALT): Observable<T>{
    // has to be done if the localstroage has changed
    this.setHeaders();
    const response = this.http.post<T>(path, body, this.httpOptions);
    return this.genGenerObs(response);
  }
  put(path: string, body: T): Observable<T>{
    // has to be done if the localstroage has changed
    this.setHeaders();
    const response = this.http.put<T>(path, body, this.httpOptions);
    return this.genGenerObs(response);
  }
  delete(path: string): Observable<T>{
    // has to be done if the localstroage has changed
    this.setHeaders();
    const response = this.http.delete<T>(path, this.httpOptions);
    return this.genGenerObs(response);
  }



  /** method for setting custom headers
   *
   */
  public setHttpHeaders(headers: HttpHeaders): void{
    this.httpOptions.headers = headers;
  }

  /** generate Generic observable
   *
   */
  protected genGenerObs(response: Observable<any>, route: boolean = true): Observable<T>{
    return response;
    // return new Observable<T>(subscriber => {
    //   response.subscribe(
    //       res => subscriber.next(res),
    //       error => {
    //         subscriber.error(this.errorHandler.handleHttpError(error, route));
    //       }
    //   );
    // });
  }





  /**
   * the localstore changes, but it could be that the object is already constructed, so the header has to be resetted
   * @private
   */
  private setHeaders(): void{
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(Constants.localStToken)}),
    };
  }
}
