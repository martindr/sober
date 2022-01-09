import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(private storage: StorageMap) { }

  savePeople(people: ) {

  }
}
