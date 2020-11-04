import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Filters } from '../../interfaces/filters';
import { FilterService } from '../../services/filters/filter.service';

@Component({
  selector: 'app-post-filter',
  templateUrl: './post-filter.component.html',
  styleUrls: ['./post-filter.component.scss']
})
export class PostFilterComponent implements OnInit {


  constructor(public filterService: FilterService) { }

  ngOnInit(): void {
   
  }

  setType(filter: string) {
    this.filterService.isFilter = {...this.filterService.isFilter, type: filter}
    this.filterService.setFilter()
  }

  setTag(filter: string) {
    this.filterService.isFilter = {...this.filterService.isFilter, tag: filter}
    this.filterService.setFilter()
  }

  setOrderCategory(filter: string) {
    this.filterService.isFilter = {...this.filterService.isFilter, orderCategory: filter}
    this.filterService.setFilter()     
  }

  setOrderBy(filter: "asc" | "desc") {
    this.filterService.isFilter = {...this.filterService.isFilter, orderBy: filter}
    this.filterService.setFilter()
  }
}
