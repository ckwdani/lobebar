import { Component } from '@angular/core';

export interface Shift {
  name: string;
  datetime: string;
  num_persons: number;
  persons: Array<string>;
}

const ELEMENT_DATA: Shift[] = [
  { name: 'Hydrogen',datetime: "11.04.2023", num_persons: 1.0079, persons:[ 'H']},
  { name: 'Helium',datetime: "11.04.2023", num_persons: 4.0026, persons:[ 'He']},
  { name: 'Lithium',datetime: "11.04.2023", num_persons: 6.941, persons:[ 'Li']},
  { name: 'Beryllium',datetime: "11.04.2023", num_persons: 9.0122, persons:[ 'Be']},
  { name: 'Boron',datetime: "11.04.2023", num_persons: 10.811, persons:[ 'B']},
  { name: 'Carbon',datetime: "11.04.2023", num_persons: 12.0107, persons:[ 'C']},
  { name: 'Nitrogen',datetime: "11.04.2023", num_persons: 14.0067, persons:[ 'N']},
  { name: 'Oxygen',datetime: "11.04.2023", num_persons: 15.9994, persons:[ 'O']},
  { name: 'Fluorine',datetime: "11.04.2023", num_persons: 18.9984, persons:[ 'F']},
  { name: 'Neon',datetime: "11.04.2023", num_persons: 20.1797, persons:[ 'Ne']},
];

@Component({
  selector: 'frontend-lb-nx-shift-table',
  templateUrl: './shift-table.component.html',
  styleUrls: ['./shift-table.component.scss'],
})
export class ShiftTableComponent {
  displayedColumns: string[] = ['name', 'datetime', 'num_persons', 'persons', 'assign'];
  dataSource = ELEMENT_DATA;
}
