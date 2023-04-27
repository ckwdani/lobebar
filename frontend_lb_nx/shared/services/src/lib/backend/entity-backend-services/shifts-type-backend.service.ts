// service class that handles backend requests for the shift type entity, just like org event backend service

import {Injectable} from "@angular/core";
import {BaseCommunicatorService} from "../common/base-communicator.service";
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ShiftTypeBackendService extends BaseCommunicatorService<ShiftType>{

    public getAll(): Observable<ShiftType[]>{
        return super.getList('');
    }

    public getById(id: string): Observable<ShiftType> {
        return super.get(id);
    }

    public add(shiftType: ShiftType):Observable<ShiftType>{
        return super.post('', shiftType);
    }

    override delete(id: string): Observable<ShiftType>{
        return super.delete(id);
    }


}
