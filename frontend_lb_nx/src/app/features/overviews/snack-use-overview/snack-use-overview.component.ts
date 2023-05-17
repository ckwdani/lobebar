import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {
  selectShiftTypesLoading,
  selectSnackTypes
} from "../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {
  SimpleTableComponent,
} from "../../../../../shared/ui/src/lib/components/simpleTable/simple-table.component";
import {Snack, SnackType} from "@frontend-lb-nx/shared/entities";
import {Store} from "@ngrx/store";

import {MatDialog} from "@angular/material/dialog";
import {
  NumberInputDialogComponent
} from "../../../core/components/dialogs/number-input-dialog/number-input-dialog.component";
import {loadOwnUsedSnacks, selectOwnUser, useSnack} from "@frontend-lb-nx/shared/services";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'frontend-lb-nx-snack-use-overview',
  templateUrl: './snack-use-overview.component.html',
  styleUrls: ['./snack-use-overview.component.scss']
})
export class SnackUseOverviewComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) sort: MatPaginator | undefined;
  @ViewChild('table3') table3: SimpleTableComponent<SnackType> = new SimpleTableComponent<SnackType>();

  @Input() usedSnacks?: Observable<Snack[]>
  displayData = this.usedSnacks

  $snackTypes = this.store.select(selectSnackTypes).pipe();
  loadingSnackTypes = false
  $shiftTypesLoading = this.store.select(selectShiftTypesLoading).pipe();

  value(snackType: SnackType): string  {
    return <string>snackType.value?.toString();
  }

  nameFromSnackType(snackType: SnackType): string {
    return <string>snackType.name;
  }

  openDialog(snackType: SnackType): void {
    const dialogRef = this.dialog.open(NumberInputDialogComponent, {data: {displayString: snackType.name}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.select(selectOwnUser).pipe().subscribe(
            next=> this.store.dispatch(useSnack({snackType, amount: result, userId: next?.id}))
        )
      }
      console.log('The dialog was closed');
    });
  }

  constructor(private store: Store, public dialog: MatDialog) {
    this.store.dispatch(loadOwnUsedSnacks())
  }

  ngAfterViewInit(): void {
    this.displayData=this.usedSnacks
        if(this.paginator!==undefined){
          this.sort = this.paginator
        }
    }

  ngOnInit(): void {

  }

  onPageChange($event: PageEvent) {
    const startIndex = $event.pageIndex * $event.pageSize;
    const endIndex = startIndex + $event.pageSize;
    this.displayData = this.usedSnacks?.pipe(map(snacks => snacks.slice(startIndex, endIndex)));
  }




}

