import { Injectable } from '@angular/core';
import {filter, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpErrorHandlerService} from "./http-error-handler.service";
import {Store} from "@ngrx/store";
import {AuthState} from "../states/auth/auth.reducer";
import {selectToken} from "../states/auth/auth.selectors";
import {catchError} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class BaseCommunicatorService<T> {



  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };
  constructor(protected http: HttpClient, private errorHandler: HttpErrorHandlerService, private store: Store) {}

  $sel = this.store.select(selectToken).pipe(filter(token => token != null)).subscribe(next => {
    this.httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + next});
  });



  get<ALT>(path: string): Observable<T>{
    // has to be done if the localstroage has changed
    this.setHeaders();
    const response = this.http.get<T>(path, this.httpOptions);
    return this.genGenerObs(response);
  }


  getList<ALT>(path: string): Observable<T[]>{
    // has to be done if the localstroage has changed
    this.setHeaders();
    const response = this.http.get<T[]>(path, this.httpOptions);
    return this.genGenerObs<T[]>(response) as Observable<T[]>;
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
  protected genGenerObs<ALT>(response: Observable<T | ALT>): Observable<T | ALT>{
    return response.pipe(catchError(error => {
      this.errorHandler.handleHttpError(error);
        return of(error);
    }));
  }





  /**
   * the localstore changes, but it could be that the object is already constructed, so the header has to be resetted
   * @private
   */
  private setHeaders(): void{
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("Constants.localStToken")}),
    };
  }
}
