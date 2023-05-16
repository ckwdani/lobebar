import { Injectable } from '@angular/core';
import {filter, Observable, of, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpErrorHandlerService} from "./http-error-handler.service";
import {Store} from "@ngrx/store";
import {AuthState} from "../states/auth/auth.reducer";
import {selectToken} from "../states/auth/auth.selectors";
import {catchError, map} from "rxjs/operators";
import {DatePipe} from "@angular/common";
import {forEach} from "@angular-devkit/schematics";



@Injectable({
  providedIn: 'root'
})
export class BaseCommunicatorService<T> {



  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };
  constructor(protected http: HttpClient, private errorHandler: HttpErrorHandlerService, private store: Store, protected  datePipe: DatePipe) {}

  $sel = this.store.select(selectToken).pipe(filter(token => token != null)).subscribe(next => {
    this.httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: 'Bearer ' + next});
  });



  get<ALT>(path: string): Observable<T>{
    // has to be done if the localstroage has changed
   // this.setHeaders();
    const response = this.http.get<T>(path, this.httpOptions);
    return this.genGenerObs(response);
  }


  getList<ALT>(path: string): Observable<T[]>{
    // has to be done if the localstroage has changed
   // this.setHeaders();
    const response = this.http.get<T[]>(path, this.httpOptions);
    return this.genGenerObs<T[]>(response) as Observable<T[]>;
  }
  post<ALT>(path: string, body: T | ALT): Observable<T>{
    // has to be done if the localstroage has changed
   // this.setHeaders();
    const response = this.http.post<T>(path, body, this.httpOptions);
    return this.genGenerObs(response);
  }
  put<ALT>(path: string, body: T|ALT): Observable<T>{
    // has to be done if the localstroage has changed
    //this.setHeaders();
    const response = this.http.put<T>(path, body, this.httpOptions);
    return this.genGenerObs(response);
  }
  delete(path: string): Observable<T>{
    // has to be done if the localstroage has changed
    //this.setHeaders();
    const response = this.http.delete<T>(path, this.httpOptions);
    return this.genGenerObs(response);
  }


  deserializeDate(date: string): Date{
    return new Date(this.datePipe.transform(date, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSSSSZ')??'');
  }


  /** method for setting custom headers
   *
   */
  public setHttpHeaders(headers: HttpHeaders): void{
    this.httpOptions.headers = headers;
  }


  // generateDateForObject<ALT>(obj: T | ALT): T | ALT{
  //   interface BigObject<T> {
  //     [index: string]: T
  //   }
  //   let bigObject: BigObject<object> = {};
  //   Object.keys(bigObject).forEach(key => {
  //     let test = bigObject[key] instanceof Date;
  //     console.log(bigObject[key] instanceof Date)
  //   })
  //   Object.entries(obj as { [key: string]: unknown }).forEach(([key, value]) => {
  //     if(obj[key as keyof (T | ALT)] instanceof Date){
  //       obj[key as keyof (T | ALT)] = this.deserializeDate(obj[key as keyof (T | ALT)] as string) as T[keyof T & keyof ALT] & ALT[keyof T & keyof ALT];
  //     }
  //   });
  //   return obj as T | ALT;
  // }

  /** generate Generic observable
   *
   */
  protected genGenerObs<ALT>(response: Observable<T | ALT>): Observable<T | ALT>{

    return response.pipe(
        // // deseraialize every date on the Object T
        // map((res) => {
        //   if(res instanceof Array){
        //     return res.map((obj) => this.generateDateForObject(obj)) as ALT | T;
        //   }
        //   Object.entries(res as { [key: string]: unknown }).forEach(([key, value]) => {
        //     if(res[key as keyof (T | ALT)] instanceof Date){
        //       res[key as keyof (T | ALT)] = this.deserializeDate(res[key as keyof (T | ALT)] as string) as T[keyof T & keyof ALT] & ALT[keyof T & keyof ALT];
        //     }
        //   });
        //   // forEach( (value, key) => {
        //   //   if(value instanceof Date){
        //   //     res[key] = this.deserializeDate(value);
        //   //   }
        //   // });
        //     return res;
        // }),

        tap({

      // next: (a) => {},
      error: (error) => {
        this.errorHandler.handleHttpError(error);
        return of(error);
      }
    }));
  }






  /**
   * the localstore changes, but it could be that the object is already constructed, so the header has to be resetted
   * @private
   */
/*  private setHeaders(): void{
    console.log(localStorage.getItem("Constants.localStToken"))
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(Constants.localStToken)}),
    };
  }*/
}
