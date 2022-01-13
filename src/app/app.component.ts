import { Component, HostListener, OnInit } from '@angular/core';
import { Person } from './person.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataStoreService } from './data-store.service';
import { AddPersonDialogComponent } from './add-person/add-person.component';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataStoreService]
})
export class AppComponent {
  title = 'sober';
  displayedColumns: string[] = ['name'];
  people: Person[] = [];

  constructor(public dialog: MatDialog, private dataStoreService: DataStoreService,) {
  }

  ngOnInit(): void {

    // Refresh data every hour so as to recalculate days sober

    const subscribe = timer(0, 3600000).subscribe(val => {
      this.people = [];
      this.dataStoreService.getPeople().subscribe((peeps) => {
        for (let p of peeps) {
          this.people.push(new Person(p.name, p.startDate));
        }
        this.sortPeople();
        console.log("refreshed people");
      });
    });
  }

  delete(name: String) {
    this.people.splice(this.people.findIndex(p => p.name === name), 1);
    this.save();
  }

  save() {
    this.sortPeople();
    this.dataStoreService.savePeople(this.people);
    console.log("Saved");
  }

  sortPeople() {
    this.people = this.people.sort((a, b) => Number(a.getDays()) - Number(b.getDays()));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPersonDialogComponent, {
      width: '90vw',
      data: new Person("", new Date())
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.name != null && result.name != "") {
        this.people.push(result);
        this.sortPeople();
        this.save();
      }
    });
  }
}
