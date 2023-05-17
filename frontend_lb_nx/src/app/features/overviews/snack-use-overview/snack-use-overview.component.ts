import {Component, ViewChild} from '@angular/core';
import {
  selectShiftTypesLoading,
  selectSnackTypes
} from "../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {SimpleTableComponent} from "../../../../../shared/ui/src/lib/components/simpleTable/simple-table.component";
import {DoneExtraWorkTypes, ShiftType, SnackType} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";
import {
  ShiftType_DoneEW_AddComponentDialog
} from "../../../core/components/dialogs/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'frontend-lb-nx-snack-use-overview',
  templateUrl: './snack-use-overview.component.html',
  styleUrls: ['./snack-use-overview.component.css']
})
export class SnackUseOverviewComponent {
  @ViewChild('table3') table3: SimpleTableComponent<SnackType> = new SimpleTableComponent<SnackType>();

  $snackTypes = this.store.select(selectSnackTypes);
  loadingSnackTypes = false
  $shiftTypesLoading = this.store.select(selectShiftTypesLoading);

  value(snackType: SnackType): string  {
    return <string>snackType.value?.toString();
  }

  nameFromSnackType(snackType: SnackType): string {
    return <string>snackType.name;
  }

  openDialog(isShiftType: boolean = true, isEwType: boolean= false): void {
    const dialogRef = this.dialog.open(ShiftType_DoneEW_AddComponentDialog, {data: {isShiftType: isShiftType, isEwType: isEwType}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  constructor(private store: Store, public dialog: MatDialog) {}

}
