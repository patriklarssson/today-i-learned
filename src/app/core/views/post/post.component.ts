import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { PostsService } from '../../services/posts/posts.service';
import { DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private sanitizer: DomSanitizer
  ) { }

    postId: string
    post: Post

  ngOnInit(): void {
    this.postId = this.route.snapshot.queryParamMap.get('postid')    
    this.getPost()
  }

  getHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.post.body)
  }

  getPost(): void {
    this.postsService.getPostById(this.postId).snapshotChanges().pipe(
      map(res => res)).subscribe(item => {
      this.post = item.payload.val() as Post
    })     
  }
}

