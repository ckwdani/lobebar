import {Component, Inject} from '@angular/core';
import {DoneExtraWorkTypes, ShiftType} from "@frontend-lb-nx/shared/entities";
import {FormControl, Validators} from "@angular/forms";
import {
  selectShiftTypes,
  selectShiftTypesAdding,
  selectShiftTypesError
} from "../../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {
  ShiftTypeBackendService
} from "../../../../../../shared/services/src/lib/backend/entity-backend-services/shifts-type-backend.service";
import {Store} from "@ngrx/store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {combineLatest, filter, pairwise} from "rxjs";
import {map} from "rxjs/operators";
import {
  addExtraWorkType,
  addShiftType
} from "../../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.actions";
import {DialogData} from "@frontend-lb-nx/shared/ui";

@Component({
  selector: 'frontend-lb-nx-edit-name-dialog',
  templateUrl: './edit-name-dialog.component.html',
  styleUrls: ['./edit-name-dialog.component.scss'],
})
export class EditNameDialogComponent {


  fcname = new FormControl(this.data.name, [Validators.required, Validators.minLength(3)])

  constructor(private  shiftTypeService: ShiftTypeBackendService, private store: Store, @Inject(MAT_DIALOG_DATA) public data: {name: string, isError?: boolean},  public dialogRef: MatDialogRef<EditNameDialogComponent>,) {
    console.log(data)
  }

  onSubmit() {
    if (this.fcname.valid) {
      this.dialogRef.close(this.data.name);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
