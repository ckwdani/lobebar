import {Component, Inject, Input, OnInit} from '@angular/core';
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {
  ShiftTypeBackendService
} from "../../../../../../shared/services/src/lib/backend/entity-backend-services/shifts-type-backend.service";
import {Store} from "@ngrx/store";
import {
  selectShiftTypes, selectShiftTypesAdding, selectShiftTypesError,
  selectShiftTypesLoading, selectShiftTypeState
} from "../../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {combineLatest, combineLatestAll, distinctUntilChanged, filter, find, pairwise, tap} from "rxjs";
import {
  addExtraWorkType,
  addShiftType,
  deleteShiftType
} from "../../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.actions";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "@frontend-lb-nx/shared/ui";
import {map} from "rxjs/operators";
import {fi} from "date-fns/locale";
import {DoneExtraWorkTypes} from "../../../../../../shared/entities/src/lib/doneExtraWorkTypes";

export interface DialogDataST {
  isShiftType: boolean;
}

@Component({
  selector: 'frontend-lb-nx-shift-type-done-ew-add',
  templateUrl: './shift-type_-done-e-w_-add-component-dialog.component.html',
  styleUrls: ['./shift-type_-done-e-w_-add-component-dialog.component.scss'],
  providers: [
      // ShiftTypeAddStore
  ],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ShiftType_DoneEW_AddComponentDialog {


  model: DoneExtraWorkTypes={
    id: "",
    name: "",
    value: 0,
  }

  isShiftType = true;
  isEdit = false;
  fcname = new FormControl(this.model.name, [Validators.required, Validators.minLength(3)])
  value = new FormControl((this.model as DoneExtraWorkTypes).value, [Validators.required, Validators.min(1)])

  $loading = this.store.select(selectShiftTypesAdding);
  $error = this.store.select(selectShiftTypesError);


  constructor(private  shiftTypeService: ShiftTypeBackendService, private store: Store, @Inject(MAT_DIALOG_DATA) public data: DialogDataST,  public dialogRef: MatDialogRef<ShiftType_DoneEW_AddComponentDialog>,) {

    this.isShiftType = data.isShiftType;

    this.store.select(selectShiftTypes).subscribe(next =>
    {
      this.shiftTypes= next
    })

    combineLatest([this.$loading, this.$error]).
    pipe(
        pairwise(),
        filter(([[, ], [, error2]]) => error2 === undefined ),
        map(([[loading, ], [loading2, ]]) => [loading, loading2]),
        filter((loading) => loading[0] !== loading[1]),
    )
        .subscribe(() => this.dialogRef.close());

  }
  shiftTypes : ShiftType[]|undefined;

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendShiftType(){

    // const copyModel= Object.assign({},this.model)

    if(this.isShiftType){
      this.store.dispatch(addShiftType({shiftType: this.model}))
    }
    else{
      this.store.dispatch(addExtraWorkType({ew_type: this.model}))
    }
    // this.model.name=""
  }

  editShiftType(shiftType: ShiftType){
    this.model.name=shiftType.name

  }

  deleteShiftType(shiftType: ShiftType){
    this.store.dispatch(deleteShiftType({shiftType: shiftType}))
  }
}
