import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { Tag } from '../../interfaces/tag';
import { PostsService } from '../../services/posts/posts.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { TagsService } from '../../services/tags/tags.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(
    private postsService: PostsService,
    private tagsService: TagsService,
    private route: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getTags()
    this.authService.user.subscribe((user) => {
      this.post.createdBy = user.displayName
      this.post.createdByUserUID = user.uid
    })
  }

  tagBadges: Tag[]

  newTag: Tag = { tag: "" }

  post: Post = { body: "", date: firebase.firestore.FieldValue.serverTimestamp(), language: "", tags: [], title: "", views: 0, createdBy: "", createdByUserUID: "" }


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
    this.tagsService.createTag(this.newTag)
  }

  getTags(): void {
    // console.log("enter");

    // this.postsService.getTagList().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.key, ...c.payload.val() })))
    // ).subscribe(x => {
    //   this.tagBadges = x
    // })
  }

  searchTags(search) {
    if (search) {
      this.tagsService.searchTags(search).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
      ).subscribe(x => {
        this.tagBadges = x
      })
    }
  }

  postPost(): void {
    this.post.date = firebase.firestore.FieldValue.serverTimestamp()
    this.post.views = 0

    this.postsService.createPost(this.post)
      .then(x => {
        this.route.navigate(['/post'], { queryParams: { postid: x } });
      })
  }



}
