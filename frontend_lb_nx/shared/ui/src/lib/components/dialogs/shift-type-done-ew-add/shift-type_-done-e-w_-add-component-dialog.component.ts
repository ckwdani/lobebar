import {Component, Inject, Input, OnInit} from '@angular/core';
import {ShiftType, SnackType} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {
  selectShiftTypes, selectShiftTypesAdding, selectShiftTypesError,
} from "@frontend-lb-nx/shared/services";
import {combineLatest, combineLatestAll, distinctUntilChanged, filter, find, pairwise, tap} from "rxjs";
import {
  addExtraWorkType,
  addShiftType, addSnackType,
  deleteShiftType
} from "@frontend-lb-nx/shared/services";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "@frontend-lb-nx/shared/ui";
import {map} from "rxjs/operators";
import {fi} from "date-fns/locale";
import {DoneExtraWorkTypes} from "@frontend-lb-nx/shared/entities";

export interface DialogDataST {
  isShiftType: boolean;
  isEwType: boolean
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
    showInBooking: false,
  }


  isShiftType = true;
  isEwType = false
  isEdit = false;
  fcname = new FormControl(this.model.name, [Validators.required, Validators.minLength(3)])
  value = new FormControl((this.model as DoneExtraWorkTypes).value, [Validators.required, Validators.min(1)])

  $loading = this.store.select(selectShiftTypesAdding);
  $error = this.store.select(selectShiftTypesError);

  typeHeading = ''
  typeLabel = ''
  typeValueLabel = ''


  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public data: DialogDataST,  public dialogRef: MatDialogRef<ShiftType_DoneEW_AddComponentDialog>,) {

    this.isShiftType = data.isShiftType;
    this.isEwType = data.isEwType

    if(this.isShiftType){
      this.typeHeading = 'Erstelle Schichtarten.'
      this.typeLabel = 'Schichttypname'
      this.typeValueLabel = 'Schichtwert'
    }
    if(this.isEwType){
      this.typeHeading = 'Erstelle Extra Arbeiten'
      this.typeLabel = 'Extra Arbeitname'
      this.typeValueLabel = 'Extra Arbeitwert'
    }
    if(!this.isShiftType&&!this.isEwType){
      this.typeHeading = 'Erstelle Snackarten'
      this.typeLabel = 'Snackarten'
      this.typeValueLabel = 'Snackartwert'
    }

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
      if(this.isEwType){
        this.store.dispatch(addExtraWorkType({ew_type: this.model}))
      }else{
        this.store.dispatch(addSnackType({snackType: this.model as SnackType}))
      }

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
