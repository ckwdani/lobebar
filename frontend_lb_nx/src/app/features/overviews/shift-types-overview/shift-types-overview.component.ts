import {Component, ElementRef, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  selectEWTypes,
  selectShiftTypes,
  selectShiftTypesLoading
} from "../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {SimpleTableComponent} from "../../../../../shared/ui/src/lib/components/simpleTable/simple-table.component";
import {DoneExtraWorkTypes, ShiftType} from "@frontend-lb-nx/shared/entities";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";
import {MatDialog} from "@angular/material/dialog";
import {ShiftType_DoneEW_AddComponentDialog} from "../../../core/components/shift-type-done-ew-add/shift-type_-done-e-w_-add-component-dialog.component";
import {
  deleteEWT,
  deleteShiftType
} from "../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.actions";

@Component({
  selector: 'frontend-lb-nx-shift-types-overview',
  templateUrl: './shift-types-overview.component.html',
  styleUrls: ['./shift-types-overview.component.scss'],
  animations: [InSiteAnimations.sequentialFadeIn]
})
export class ShiftTypesOverviewComponent {

  @ViewChild('table') table: SimpleTableComponent<ShiftType> = new SimpleTableComponent<ShiftType>();
  @ViewChild('table2') table2: SimpleTableComponent<DoneExtraWorkTypes> = new SimpleTableComponent<DoneExtraWorkTypes>();


  $shiftTypes = this.store.select(selectShiftTypes);
  $ew_types= this.store.select(selectEWTypes);
  $shiftTypesLoading = this.store.select(selectShiftTypesLoading);

  // constructore with store
  constructor(private store: Store, public dialog: MatDialog) {}

  nameFromShiftType(shiftType: ShiftType | DoneExtraWorkTypes): string {
    return shiftType.name;
  }


  openDialog(isShiftType: boolean = true): void {
    const dialogRef = this.dialog.open(ShiftType_DoneEW_AddComponentDialog, {data: {isShiftType: isShiftType}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  deleteSt(type: ShiftType) {
    this.store.dispatch(deleteShiftType({shiftType: type}));
  }
  deleteEwt(type: DoneExtraWorkTypes | ShiftType) {
    console.log(type)
    this.store.dispatch(deleteEWT({ew_type: type as DoneExtraWorkTypes}));
  }

}
