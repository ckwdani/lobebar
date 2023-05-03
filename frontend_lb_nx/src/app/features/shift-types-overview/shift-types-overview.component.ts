import {Component, ElementRef, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  selectShiftTypes,
  selectShiftTypesLoading
} from "../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {SimpleTableComponent} from "../../../../shared/ui/src/lib/components/simpleTable/simple-table.component";
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";
import {MatDialog} from "@angular/material/dialog";
import {ShiftTypeAddComponent} from "./shift-type-add/shift-type-add.component";

@Component({
  selector: 'frontend-lb-nx-shift-types-overview',
  templateUrl: './shift-types-overview.component.html',
  styleUrls: ['./shift-types-overview.component.scss'],
  animations: [InSiteAnimations.sequentialFadeIn]
})
export class ShiftTypesOverviewComponent {

  @ViewChild('table') table: SimpleTableComponent<ShiftType> = new SimpleTableComponent<ShiftType>();


  $shiftTypes = this.store.select(selectShiftTypes);
  $shiftTypesLoading = this.store.select(selectShiftTypesLoading);

  // constructore with store
  constructor(private store: Store, public dialog: MatDialog) {}

  nameFromShiftType(shiftType: ShiftType): string {
    return shiftType.name;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ShiftTypeAddComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
