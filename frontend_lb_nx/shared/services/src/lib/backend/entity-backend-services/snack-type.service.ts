import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DoneExtraWorkTypes, Snack, SnackType} from "@frontend-lb-nx/shared/entities";
import {BACKENDPATHS} from "../BACKENDPATHS";
import {BaseCommunicatorService} from "../common/base-communicator.service";

@Injectable({
  providedIn: 'root'
})
export class SnackTypeService extends BaseCommunicatorService<SnackType>{

  public getAll(): Observable<SnackType[]>{
    return super.getList(BACKENDPATHS.getSnackTypes );
  }


  public add(snack_type: SnackType):Observable<SnackType>{
    return super.post(BACKENDPATHS.addSnackType, snack_type);
  }

  public update(snack_type: SnackType): Observable<SnackType>{
    return super.put(BACKENDPATHS.updateSnackType +'/'+snack_type.id +'/' + snack_type.name, snack_type);
  }

  override delete(id: string): Observable<SnackType>{
    return super.delete(BACKENDPATHS.deleteSnackType + '/' + id);
  }


}
