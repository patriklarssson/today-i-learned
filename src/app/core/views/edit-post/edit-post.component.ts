import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { Tag } from '../../interfaces/tag';
import { PostsService } from '../../services/posts/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) { }

  postId: string
  post: Post
  tagBadges: Tag[]

  newTag: Tag = { tag: "" }

  ngOnInit(): void {
    this.postId = this.route.snapshot.queryParamMap.get('postid')
    this.getPost()
  }

  tagsInputAdd(badge): void {
    this.post.tags.push(badge.value)
  }
  tagsInputRemove(badge): void {
    this.post.tags = this.post.tags.filter(x => x != badge.value)
  }

  inputTagList() {
    if (this.tagBadges && this.tagBadges.length > 0)
      return this.tagBadges.map(x => x.tag)
  }

  addTag(): void {
    this.postsService.createTag(this.newTag)
  }

  getTags(): void {
    console.log("enter");

    this.postsService.getTagList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(x => {
      this.tagBadges = x
    })
  }

  getPost(): void {
    this.postsService.getPostById(this.postId).snapshotChanges().pipe(
      map(res => res)).subscribe(item => {
        this.post = item.payload.val() as Post
      })
  }

  savePost(): void {
    this.postsService.updatePost(this.postId, this.post).then(x => {
      this.router.navigate(['/post'], { queryParams: { postid: this.postId } })
    })
    

  }

}
