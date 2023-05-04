// service class that handles backend requests for the shift type entity, just like org event backend service

import {Injectable} from "@angular/core";
import {BaseCommunicatorService} from "../common/base-communicator.service";
import {DoneExtraWorkTypes, ShiftType} from "@frontend-lb-nx/shared/entities";
import {Observable} from "rxjs";
import {BACKENDPATHS} from "../BACKENDPATHS";

@Injectable({providedIn: 'root'})
export class EW_Types_BackendService extends BaseCommunicatorService<DoneExtraWorkTypes>{

    public getAll(): Observable<DoneExtraWorkTypes[]>{
        return super.getList(BACKENDPATHS.app_doneEwtrawork_getshifttypes );
    }


    public add(ew_types: DoneExtraWorkTypes):Observable<DoneExtraWorkTypes>{
        return super.post(BACKENDPATHS.app_doneEwtrawork_addshifttype, ew_types);
    }

    public update(ew_types: DoneExtraWorkTypes): Observable<DoneExtraWorkTypes>{
        return super.put(BACKENDPATHS.app_doneEwtrawork_updateNam + ew_types.id, ew_types);
    }

    override delete(id: string): Observable<DoneExtraWorkTypes>{
        return super.delete(BACKENDPATHS.app_doneEwtrawork_deleteshifttype + id);
    }


}
