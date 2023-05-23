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
import {
  loadOwnUsedSnacks,
  selectLoggedIn,
  selectOwnUser, selectSnackState, selectUsedSnacks,
  selectUserLoaded,
  useSnack
} from "@frontend-lb-nx/shared/services";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {combineLatest, filter, first, groupBy, mergeMap, Observable, of, toArray} from "rxjs";
import {map} from "rxjs/operators";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";

interface GroupedSnack {
  snackType: SnackType;
  count: number;
  date: Date;
  dateKey: string;
}

@Component({
  selector: 'frontend-lb-nx-snack-use-overview',
  templateUrl: './snack-use-overview.component.html',
  styleUrls: ['./snack-use-overview.component.scss'],
  animations: [InSiteAnimations.inOutAnimation, InSiteAnimations.sequentialFadeIn]
})
export class SnackUseOverviewComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) sort: MatPaginator | undefined;
  @ViewChild('table3') table3: SimpleTableComponent<SnackType> = new SimpleTableComponent<SnackType>();

  // $ownUsedSnacks = this.store.select(selectUsedSnacks).pipe(map(snacks => snacks??[]));
  $ownUsedSnacksGrouped = this.store.select(selectSnackState).pipe(filter(state => !state.isLoading),
      map(snacks => this.groupSnacks(snacks.usedSnacks??[])));

  $ownUsedSnacksLoading = this.store.select(selectSnackState).pipe(map(state => state.isLoading));

  $ownUsedSnacks = this.$ownUsedSnacksGrouped;
  displayData = this.$ownUsedSnacksGrouped;

  $isLoggedIn = this.store.select(selectLoggedIn).pipe();
  $userLoaded = this.store.select(selectUserLoaded).pipe();
  $snackTypes = this.store.select(selectSnackTypes).pipe();
  loadingSnackTypes = false
  $snackTypesLoading = this.store.select(selectShiftTypesLoading).pipe();

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
        console.log(result)
        this.store.select(selectOwnUser).pipe().subscribe(
            next=> this.store.dispatch(useSnack({snackType, amount: result, userId: next?.id}))
        )
      }
      console.log('The dialog was closed');
    });
  }



  constructor(private store: Store, public dialog: MatDialog) {
    combineLatest([this.$userLoaded, this.$isLoggedIn]).subscribe(([userLoaded, isLoggedIn]) => {
      if (userLoaded && isLoggedIn) {
        this.store.dispatch(loadOwnUsedSnacks())
      }
    });
    // this.store.dispatch(loadOwnUsedSnacks())
  }

  ngAfterViewInit(): void {
    this.displayData=this.$ownUsedSnacks
    if(this.paginator!==undefined){
      this.sort = this.paginator
    }
    this.onPageChange({pageIndex: 0, pageSize: this.paginator?.pageSize??5, length: 0})

    }

  ngOnInit(): void {
    this.displayData=this.$ownUsedSnacks;
  }

  onPageChange($event: PageEvent) {
    const startIndex = $event.pageIndex * $event.pageSize;
    const endIndex = startIndex + $event.pageSize;
    this.displayData = this.$ownUsedSnacks?.pipe(map(snacks => snacks.slice(startIndex, endIndex)))?? this.displayData;
  }





  groupSnacks(snacks: Snack[]): GroupedSnack[]{
    const groupedSnacks: GroupedSnack[] = snacks.reduce((groups: GroupedSnack[], snack: Snack) => {
      const snackDate = new Date(snack.date);
      const groupKey = `${snackDate.toDateString()} ${snackDate.getHours()}`;

      // Find the group with the same key
      const group = groups.find((g) => g.dateKey === groupKey);

      if (group) {
        // Group already exists, update the count and date if needed
        group.count++;
        if (snackDate > group.date) {
          group.date = snackDate;
        }
      } else {
        // Group does not exist, create a new group
        groups.push({
          snackType: snack.snackType,
          count: 1,
          date: snackDate,
          dateKey: groupKey,
        });
      }

      return groups;
    }, []);
    return groupedSnacks;
  }





}

