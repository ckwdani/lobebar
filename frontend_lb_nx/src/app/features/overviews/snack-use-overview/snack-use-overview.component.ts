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
import {groupBy, mergeMap, Observable, toArray} from "rxjs";
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
  displayData = this.groupSnacksForSameDate(this.usedSnacks)

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
        console.log(result)
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
    this.displayData=this.groupSnacksForSameDate(this.usedSnacks)
    if(this.paginator!==undefined){
      this.sort = this.paginator
    }
    this.onPageChange({pageIndex: 1, pageSize: this.paginator?.pageSize??5, length: 0})

    }

  ngOnInit(): void {
    this.displayData=this.groupSnacksForSameDate(this.usedSnacks)
  }

  onPageChange($event: PageEvent) {
    const startIndex = $event.pageIndex * $event.pageSize;
    const endIndex = startIndex + $event.pageSize;
    this.displayData = this.usedSnacks?.pipe(map(snacks => snacks.slice(startIndex, endIndex)));
  }

  groupSnacksForSameDateRx(entities$: Observable<Snack[]> | undefined){
    if(entities$!=undefined){
      return entities$
          .pipe(
              mergeMap(entities => entities), // Flatten the array of entities
              groupBy(entity => entity.date), // Group entities by date
              mergeMap(group => group.pipe(toArray())), // Convert each group to an array
              map(groupedEntities => {
                const groupSize = groupedEntities.length;

                if (groupSize > 1) {
                  return groupedEntities.map((entity, index) => {
                    entity.snackType.name = `${entity.snackType.name} ${index + 1}`;
                    return entity;
                  });
                } else {
                  return groupedEntities;
                }
              }),
              mergeMap(snacks =>snacks) // Collect all groups into a single array
          )
    }
    return entities$
  }
  groupSnacksForSameDate(entities$: Observable<Snack[]> | undefined){
    if(entities$!=undefined) {
      entities$
          .pipe(
              map(entities => {
                const groupedEntities = entities.reduce((groups: Map<Date, Snack[]>, entity) => {
                  const date = entity.date;

                  if (groups.has(date)) {
                    groups.get(date)?.push(entity);
                  } else {
                    groups.set(date, [entity]);
                  }

                  return groups;
                }, new Map<Date, Snack[]>());

                groupedEntities.forEach((group: Snack[]) => {
                  const groupSize = group.length;
                  const newName = `name ${groupSize}`;

                  // Change the name of the first entity with the shared date
                  if (groupSize >= 2) {
                    group[0].snackType.name = newName;
                  }
                });

                const reducedArray = Array.from(groupedEntities.values()).flat();
                this.paginator?.firstPage()
                return reducedArray;
              })
          )
          .subscribe(reducedEntities => {
            console.log(reducedEntities);
          });

    }
    return this.usedSnacks
  }

}

