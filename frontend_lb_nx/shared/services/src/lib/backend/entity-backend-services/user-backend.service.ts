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

    deleteUser(userId: string): Observable<User> {
    return super.delete(BACKENDPATHS.deleteUser+'/'+userId)
    }

    updateUser(user: User): Observable<User> {
    return super.put(BACKENDPATHS.updateUser, user)
    }

    approveUser(user: User): Observable<User> {
    return super.put(BACKENDPATHS.approveUser+'/'+user.id, user)
    }

    updateAchievement(user: User): Observable<User>{
    return super.post(BACKENDPATHS.postAchievement+'/'+user.id, user)
    }
}
