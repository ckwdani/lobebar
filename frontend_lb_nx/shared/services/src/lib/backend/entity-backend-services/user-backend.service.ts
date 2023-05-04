import { Injectable } from '@angular/core';
import {BaseCommunicatorService} from "../common/base-communicator.service";
import {ShiftType, User} from "@frontend-lb-nx/shared/entities";
import {Observable} from "rxjs";
import {BACKENDPATHS} from "../BACKENDPATHS";

@Injectable({
  providedIn: 'root'
})
export class UserBackendService extends BaseCommunicatorService<User>{
  public getAll(): Observable<User[]>{
    return super.getList(BACKENDPATHS.getAllUser);
  }

}
