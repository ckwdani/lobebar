import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {SimpleTableComponent} from "../../../../../../shared/ui/src/lib/components/simpleTable/simple-table.component";
import {DoneExtraWork, DoneExtraWorkTypes, Snack, SnackType, User} from "@frontend-lb-nx/shared/entities";
import {
  doEW, loadOwnEW,
  loadOwnUsedSnacks, selectEwState,
  selectLoggedIn,
  selectOwnUser,
  selectSnackState, selectUsedEws,
  selectUserLoaded,
  useSnack
} from "@frontend-lb-nx/shared/services";
import {combineLatest, filter, Observable, tap} from "rxjs";
import {map} from "rxjs/operators";
import {
  selectEWTypes,
  selectShiftTypesLoading,
  selectSnackTypes
} from "../../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {NumberInputDialogComponent} from "../../dialogs/number-input-dialog/number-input-dialog.component";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";
import {DoneEwOverviewStore} from "./done-ex-overview.store";


interface GroupedEw {
  ewType: DoneExtraWorkTypes;
  count: number;
  date: Date;
  dateKey: string;
}

@Component({
  selector: 'frontend-lb-nx-done-ex-overview',
  templateUrl: './done-ex-overview.component.html',
  styleUrls: ['./done-ex-overview.component.scss'],
  providers: [DoneEwOverviewStore],
  animations: [InSiteAnimations.inOutAnimation, InSiteAnimations.sequentialFadeIn]
})
export class DoneExOverviewComponent implements AfterViewInit, OnInit{
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatPaginator, {static: true}) sort: MatPaginator | undefined;
  @ViewChild('table3') table3: SimpleTableComponent<DoneExtraWorkTypes> = new SimpleTableComponent<DoneExtraWorkTypes>();

  @Input() user?: Observable<User>;

  $ownDoneEws = this.doneEwOverviewStore.doneEw$.pipe(map(ews => {

    const ewsCopy = [...ews];
    return ewsCopy.sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
  }));
  $doneEwsDisplay = this.$ownDoneEws;

  $ownDoneEwsLoading = this.doneEwOverviewStore.loading$;

  // $ownUsedEws = this.$ownDonwEwsGrouped;

  $isLoggedIn = this.store.select(selectLoggedIn).pipe();
  $userLoaded = this.store.select(selectUserLoaded).pipe();
  $ewTypes = this.store.select(selectEWTypes).pipe();
  loadingEwTypes = false
  $ewTypesLoading = this.store.select(selectShiftTypesLoading).pipe();


  constructor(private store: Store, public dialog: MatDialog, private doneEwOverviewStore: DoneEwOverviewStore) {

    // this.store.dispatch(loadOwnUsedEws())
  }

  ngOnInit(): void {

    combineLatest([this.$userLoaded, this.$isLoggedIn]).subscribe(([userLoaded, isLoggedIn]) => {

        if (userLoaded && isLoggedIn) {
          if(this.user){
            this.user.subscribe(next=> this.doneEwOverviewStore.loadEws({user: next}))
          }else{
            this.store.dispatch(loadOwnEW())
        }
      }
    });
  }
  value(ewType: DoneExtraWorkTypes): string  {
    return <string>ewType.value?.toString();
  }

  nameFromEwType(ewType: DoneExtraWorkTypes): string {
    return <string>ewType.name;
  }



  openDialog(ewType: DoneExtraWorkTypes): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {displayString: "Bestätige dass du " + ewType.name + " gemacht hast."}});
    dialogRef.afterClosed().subscribe(result => {

      if(result){
        if(this.user){
          this.user.pipe().subscribe(
              next => this.doneEwOverviewStore.doWork({ewType, userId: next.id??""})
          )
        }else{
          this.store.select(selectOwnUser).pipe().subscribe(
              next=> this.store.dispatch(doEW({ewType, amount: 1, userId: next?.id}))
          )
        }
      }
      console.log('The dialog was closed');
    });
  }





  ngAfterViewInit(): void {
    if(this.paginator!==undefined){
      this.sort = this.paginator
    }
    this.onPageChange({pageIndex: 0, pageSize: this.paginator?.pageSize??5, length: 0})

  }



  onPageChange($event: PageEvent) {
    const startIndex = $event.pageIndex * $event.pageSize;
    const endIndex = startIndex + $event.pageSize;
    this.$doneEwsDisplay = this.$ownDoneEws.pipe(map(ews => ews.slice(startIndex, endIndex)));
  }






}
