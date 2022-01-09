import { Component } from '@angular/core';

export interface Person {
  name: string;
  startDate: Date;
  days: Number
}

const ELEMENT_DATA: Person[] = [
  {name: 'Person 1', startDate: new Date("3/12/2020"), days: 1},
  {name: 'Person 2', startDate: new Date("11/13/2021"), days: 123},
  {name: 'Person 3', startDate: new Date("5/14/2019"), days: 18}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sober';
  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;

  calculateDays(dt: Date): Number {
    return Math.round((Date.now() - dt.getTime()) / (1000 * 3600 * 24));
  }

}
