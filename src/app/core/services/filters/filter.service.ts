import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filters } from '../../interfaces/filters';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  isFilter: Filters = {tag: "", orderBy: "desc", orderCategory: "", type: ""}
  filters: Subject<Filters> = new Subject<Filters>()

  constructor() { 
    this.filters.subscribe((value) => {
      this.isFilter = value
    })
  }

  setFilter() {
    this.filters.next(this.isFilter)
  }

}
