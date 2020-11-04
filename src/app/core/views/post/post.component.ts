import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { PostsService } from '../../services/posts/posts.service';
import { DomSanitizer } from '@angular/platform-browser'
import { DateTimeHelperService } from '../../helpers/date-time-helper.service';

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
    private sanitizer: DomSanitizer,
    private dateTimeHelper: DateTimeHelperService
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

  getDate(date) {
    return this.dateTimeHelper.toYYYYMMDD(date.toDate())
  }

  getPost(): void {
    this.postsService.getPostById(this.postId).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(x => {
      this.post = { ...x[0] }
    }
    )
  }
}

