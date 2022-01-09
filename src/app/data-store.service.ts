import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(private storage: StorageMap) { }

  savePeople(people: Person[]) {
    this.storage.set('people', people).subscribe(() => {});
  }

  getPeople(): Observable<any> {

    return this.storage.get('people');
  }
}
