import {Component, ElementRef, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  selectDeletingError,
  selectEWTypes,
  selectShiftTypes, selectShiftTypesAdding, selectShiftTypesAddingError, selectShiftTypesError,
  selectShiftTypesLoading, selectSnackTypes
} from "../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {DoneExtraWorkTypes, ShiftType, SnackType} from "@frontend-lb-nx/shared/entities";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";
import {MatDialog} from "@angular/material/dialog";
import {ShiftType_DoneEW_AddComponentDialog} from "../../../core/components/dialogs/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component";
import {
  deleteEWT,
  deleteShiftType, deleteSnT, EditName
} from "../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.actions";
import {SimpleTableComponent} from "../../../../../shared/ui/src/lib/components/simpleTable/simple-table.component";
import {EditStringDialogComponent} from "../../../core/components/dialogs/edit-string-dialog/edit-string-dialog.component";
import {combineLatest, filter, take, tap} from "rxjs";
import {map} from "rxjs/operators";
import {
  ImportantDeleteDialogComponent
} from "../../../core/components/dialogs/important-delete-dialog/important-delete-dialog.component";

@Component({
  selector: 'frontend-lb-nx-shift-types-overview',
  templateUrl: './shift-types-overview.component.html',
  styleUrls: ['./shift-types-overview.component.scss'],
  animations: [InSiteAnimations.sequentialFadeIn]
})
export class ShiftTypesOverviewComponent {

  @ViewChild('table') table: SimpleTableComponent<ShiftType> = new SimpleTableComponent<ShiftType>();
  @ViewChild('table2') table2: SimpleTableComponent<DoneExtraWorkTypes> = new SimpleTableComponent<DoneExtraWorkTypes>();
  @ViewChild('table3') table3: SimpleTableComponent<SnackType> = new SimpleTableComponent<SnackType>();


  $shiftTypes = this.store.select(selectShiftTypes);
  $ew_types= this.store.select(selectEWTypes);
  $snackTypes = this.store.select(selectSnackTypes);
  $shiftTypesLoading = this.store.select(selectShiftTypesLoading);
  $addingError = this.store.select(selectShiftTypesAddingError);
  $deletingError = this.store.select(selectDeletingError);

  loadingShifts = false;
  loadingEWT = false;
  loadingSnackTypes = false

  // constructore with store
  constructor(private store: Store, public dialog: MatDialog) {}

  nameFromShiftType(shiftType: ShiftType | DoneExtraWorkTypes | SnackType): string {
    return <string>shiftType.name;
  }

  value(doneEw: DoneExtraWorkTypes|SnackType): string {
    return <string>doneEw.value?.toString();
  }


  openDialog(isShiftType: boolean = true, isEwType: boolean= false): void {
    const dialogRef = this.dialog.open(ShiftType_DoneEW_AddComponentDialog, {data: {isShiftType: isShiftType, isEwType: isEwType}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editName(type: ShiftType | DoneExtraWorkTypes | SnackType, isShiftType: boolean = true, isEwtType: boolean=true, error?: number) {
    const dialogRef = this.dialog.open(EditStringDialogComponent, {data: {name: type.name, errorcode: error}});

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const interType = {...type, name: result};
            // type.name = result;
            if (isShiftType) {
              this.store.dispatch(EditName({shiftType: interType}));
              this.$addingError.pipe(map((loading,) => loading.adding)).subscribe({next: (value) => this.loadingShifts = value})
            } else {
              if(isEwtType){
                this.store.dispatch(EditName({ew_type: interType as DoneExtraWorkTypes}));
                this.$addingError.pipe(map((loading,) => loading.adding)).subscribe({next: (value) => this.loadingEWT = value})
              }else{
                this.store.dispatch(EditName({snackType: interType as SnackType}))
                this.$addingError.pipe(map((loading,) => loading.adding)).subscribe({next: (value) => this.loadingSnackTypes = value})
              }
            }
          this.$addingError.pipe(take(3), filter(x => x.error !== undefined))
              .subscribe((x) => this.editName(interType, isShiftType, isEwtType, x.error));
        }
    });
  }

  deleteSt(type: ShiftType, isError = false) {
    const dialogRef = this.dialog.open(ImportantDeleteDialogComponent, {data: {name: type.name, isError: isError}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // type.name = result;
        this.store.dispatch(deleteShiftType({shiftType: type}));
        this.$deletingError.pipe(map((loading,) => loading.adding)).subscribe({next: (value) => this.loadingShifts = value})
      }
    });


  }
  deleteEwt(type: DoneExtraWorkTypes | ShiftType, isError = false) {

    const dialogRef = this.dialog.open(ImportantDeleteDialogComponent, {data: {name: type.name, isError: isError}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // type.name = result;
        this.store.dispatch(deleteEWT({ew_type: type as DoneExtraWorkTypes}));
        this.$deletingError.pipe(map((loading,) => loading.adding)).subscribe({next: (value) => this.loadingEWT = value})
      }
    });


  }

  deleteSnT(type: DoneExtraWorkTypes | ShiftType |  SnackType, isError = false) {

    const dialogRef = this.dialog.open(ImportantDeleteDialogComponent, {data: {name: type.name, isError: isError}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // type.name = result;
        this.store.dispatch(deleteSnT({snackTypes: type as SnackType}));
        this.$deletingError.pipe(map((loading,) => loading.adding)).subscribe({next: (value) => this.loadingSnackTypes = value})
      }
    });


  }

}
