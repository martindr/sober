import { Component, OnInit } from '@angular/core';
import { Person } from './person.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataStoreService } from './data-store.service';
import { AddPersonDialogComponent } from './add-person/add-person.component';


// const PEOPLE_DATA: Person[] = [
//   new Person("Jimbo", new Date("2/2/2012")) ,
//   new Person("Judy", new Date("11/23/2021")) 
// ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:  [ DataStoreService ]
})
export class AppComponent {
  title = 'sober';
  displayedColumns: string[] = ['name'];
  people: Person[] = [];

  constructor(public dialog: MatDialog, private dataStoreService: DataStoreService,) {
    //this.people = PEOPLE_DATA;
  }

  ngOnInit(): void {
    this.dataStoreService.getPeople().subscribe((peeps) => {

      for (let p of peeps) {
        this.people.push(new Person(p.name, p.startDate));
      }

    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPersonDialogComponent, {
      width: '250px',
      data: new Person("", new Date())
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.people.push(result);
      this.dataStoreService.savePeople(this.people);
    });
  }
}
