import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from "@angular/material/sort";
import {InSiteAnimations} from "../../animations/InSiteAnimations";

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
  animations: [InSiteAnimations.sequentialFadeIn]
})
export class SimpleTableComponent<E> implements OnInit, OnChanges, AfterViewInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;



  /**
   * the input data for the table, should be given as an array
   */
  @Input() data: E[] = [];

  // input the additional columns for the table with the displayed string an the getter from the object
    @Input() additionalColumns: {displayedString: string, getter: (element: E) => string}[] = [];


  @Input() convert?: (element: E) => string;
  @Input() loading = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  /**
   * caption over the table
   */
  @Input() caption = '';


  @Input() mainColSmaller = false;

  /**
   * the component defines the editelement event, it gives back an specific element when some button to edit was clicked
   */
  @Output() edit = new EventEmitter<E>();

  /**
   * the component defines the use element event, it gives back an specific element when some button to use was clicked
   */
  @Output() use = new EventEmitter<E>();
  /**
   * the component degines the deleteelement event, it gives back an specific element when some button to delete was clicked
   */
  @Output() delete = new EventEmitter<E>();
  @Output() add = new EventEmitter<void>();

  @Input() showAddEditDelete= true


  /**
   * the state of the component
   */
  state: SimpleTableState<E> = new SimpleTableState<E>();

  elementString = 'element';
  actionsString = 'actions';

  /**
   * this array contains the columns to display in the table
   */
  displayedColumns: string[] = [this.elementString, this.actionsString];

  constructor() {
    this.sort = this.state.elementsDatasource.sort!;

  }



  ngOnInit(): void {
    this.setTableData(this.data);
    //add the additional columns to the displayed columns
    this.additionalColumns.forEach((column) => {
        this.displayedColumns.splice(1, 0, column.displayedString);
    });

    // this.displayedColumns = this.displayedColumns.concat(this.additionalColumnsDisplayed);


  }


  ngAfterViewInit(): void {

    if (this.paginator !== undefined) {
      this.state.elementsDatasource.paginator = this.paginator;
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    if (changes['data'] !== undefined) {
      this.setTableData(changes['data'].currentValue);
    }
    if(changes["additionalColumns"] !== undefined){
      this.additionalColumns = changes["additionalColumns"].currentValue;
    }
  }


  /**
   * convert the array to the table data
   */
  setTableData(elements: E[]): void{
    this.state.elementsDatasource.data = elements;
  }

  /**
   * if the deletion button is clicked this method should be invoked
   * it emits an deletion event
   *
   */
  onDeletionClick(element: E): void{
    this.delete.emit(element);
  }

  /**
   * if the edit button is clicked this method should be invoked
   * it emits an edit event
   *
   */
  onEditClick(element: E): void{
    this.edit.emit(element);
  }

  onUseClick(element: E): void {
    this.use.emit(element)
  }
}

export class SimpleTableState<E> {
  /**
   * the variable that is used to control the table (you can do soe fun stuff with it)
   */
  elementsDatasource: MatTableDataSource<E> = new MatTableDataSource<E>();
}
