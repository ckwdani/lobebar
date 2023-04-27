import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  ShiftTypeBackendService
} from "../../../../shared/services/src/lib/backend/entity-backend-services/shifts-type-backend.service";
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {EMPTY, Observable, tap} from "rxjs";
import {getJSDocReturnType} from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import {catchError} from "rxjs/operators";

export interface ShiftTypeAddStoreState {
  shiftTypes: ShiftType[];
};

const initialState: ShiftTypeAddStoreState = {shiftTypes:[]};

@Injectable()
export class ShiftTypeAddStore extends ComponentStore<ShiftTypeAddStoreState> {
  constructor(private shiftTypeService: ShiftTypeBackendService) {
    super(initialState);
  }
  private readonly shiftTypes$: Observable<ShiftType[]> = this.select(state => state.shiftTypes)

  private readonly fetchShiftTypes = this.effect(
      (shiftTypesData$: Observable<ShiftType>)=>{
        return shiftTypesData$.pipe(
            ()=>{
              return this.shiftTypeService.getAll()
            })
      })


   // readonly addShiftType = this.effect((shiftType$: Observable<ShiftType>)=> {
   //     return this.shiftTypeService.add().pipe(
   //         tap({
   //             next: (shiftType) => this.addShiftTypeState(shiftType),
   //             error: (e) => console.log(e),
   //         }),
   //         catchError(()=> EMPTY),
   //     )}
   // )
  readonly addShiftTypeState = this.updater((state, shiftType: ShiftType) =>({
    shiftTypes: [...state.shiftTypes, shiftType],
  }))
}
