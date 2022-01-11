import { Component, HostListener, OnInit } from '@angular/core';
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
  providers: [DataStoreService]
})
export class AppComponent {
  title = 'sober';
  displayedColumns: string[] = ['name'];
  people: Person[] = [];

  deferredPrompt: any;
  showButton = false;

  constructor(public dialog: MatDialog, private dataStoreService: DataStoreService,) {
    //this.people = PEOPLE_DATA;
  }

  ngOnInit(): void {
    this.dataStoreService.getPeople().subscribe((peeps) => {

      for (let p of peeps) {
        this.people.push(new Person(p.name, p.startDate));
      }

      this.sortPeople();

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

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: any) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }
  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }
}
