import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';
import { PostsService } from '../../services/posts/posts.service';
import { map, tap } from 'rxjs/operators';
import { Filters } from '../../interfaces/filters';
import { Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { FilterService } from '../../services/filters/filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public postsService: PostsService,
    public filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.get()
    this.filterService.filters.subscribe(x => this.filterPosts(x))
  }


  postsList: Post[]
  filters = this.filterService.filters

  get(): void {
    this.postsService.getPostList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(x => {
      this.postsList = x
    }
    )
  }

  filterPosts(filter: Filters) {
    if (filter.type == "" && filter.tag == "" && filter.orderCategory == ""){
      this.get()
    }
    else
      this.postsService.getFilteredPosts(filter).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
      ).subscribe(x => {
        this.postsList = x
      })
  }

}
