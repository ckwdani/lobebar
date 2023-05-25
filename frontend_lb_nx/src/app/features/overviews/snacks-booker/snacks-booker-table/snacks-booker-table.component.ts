import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CountSnacks, SnackType} from "@frontend-lb-nx/shared/entities";
import {InSiteAnimations} from "@frontend-lb-nx/shared/ui";

@Component({
  selector: 'frontend-lb-nx-snacks-booker-table',
  templateUrl: './snacks-booker-table.component.html',
  styleUrls: ['./snacks-booker-table.component.scss'],
  animations: [InSiteAnimations.sequentialFadeIn]
})
export class SnacksBookerTableComponent implements OnInit, OnChanges, AfterViewInit{

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() loading = false;
  @Input() data: CountSnacks[] = [];
  @Input() snackTypes: SnackType[] = [];
  @Input() updating: boolean = false;
  @Output() bookDate = new EventEmitter<{ date: Date, unbook: boolean }>();
  @Output() bookAll = new EventEmitter<void>();


  elementsDatasource: MatTableDataSource<CountSnacks> = new MatTableDataSource<CountSnacks>();

  elementString = 'datum';
  actionsString = 'actions';


  /**
   * this array contains the columns to display in the table
   */
  displayedColumns: string[] = [this.elementString, this.actionsString];

  constructor() {
    this.sort = this.elementsDatasource.sort!;
  }


  ngOnInit(): void {
    this.setTableData(this.data);

    //add the additional columns to the displayed columns
    // this.snackTypes.forEach((column) => {
    //   this.displayedColumns.splice(1, 0, column.name!);
    // });

    // this.displayedColumns = this.displayedColumns.concat(this.additionalColumnsDisplayed);
  }

  getSnackTypeCount(snackType: SnackType, snackCount: CountSnacks): number{
    const countSnack = snackCount.snacks.find((countSnack) => countSnack.id.uid === snackType.id);
    if(countSnack !== undefined){
      return countSnack.count;
    }
    return 0;
  }


  getBooked(snackCount: CountSnacks): boolean{
    return snackCount.snacks.some((snack) => snack.booked);
  }


  ngAfterViewInit(): void {
    if (this.paginator !== undefined) {
      this.elementsDatasource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    if (changes['data'] !== undefined) {
      this.setTableData(changes['data'].currentValue);
    }
    if(changes["snackTypes"] !== undefined){
      this.snackTypes = changes["snackTypes"].currentValue;
      this.snackTypes.forEach((column) => {
        this.displayedColumns.splice(1, 0, column.name!);
      });
    }
  }


  /**
   * convert the array to the table data
   */
  setTableData(elements: CountSnacks[]): void{
    this.elementsDatasource.data = elements;
  }


  getUsedCount(type: SnackType): number{
    return this.data.map((countSnack) => {
      const snack = countSnack.snacks.find((snack) => snack.id.uid === type.id)
      if(!snack?.booked) {
        return snack?.count ?? 0
      }
      return 0;
    }).reduce((a, b) => a + b, 0);
  }


}
