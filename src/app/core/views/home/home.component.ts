import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';
import { PostsService } from '../../services/posts/posts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.get()
  }

  postsList: Post[]

  get(): void {
    this.postsService.getPostList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(x => {
      this.postsList = x.reverse()
    }
    )
  }


}
