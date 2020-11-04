import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { Tag } from '../../interfaces/tag';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private dbPathPost = 'post'
  private dbPathTag = 'tag'
  items: Observable<any[]>;
  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore
  ) {
  }

  getPostList(): AngularFirestoreCollection<Post> {
    return this.afs.collection(this.dbPathPost, ref => 
    ref.orderBy("date", "desc")
    .limit(10)
    )
  }

  getPostById(postId: string): AngularFirestoreCollection<Post> {
    return this.afs.collection(this.dbPathPost, ref => ref.where(firebase.firestore.FieldPath.documentId(), "==", postId))
  }

  createPost(item: Post): Promise<string> {
    var idRef = this.afs.createId()

    return this.afs.collection(this.dbPathPost).doc(idRef).set(item)
      .then(x => {
        return idRef
      })
  }

  updatePost(id: string, value: Post): Promise<void> {
    return this.afs.collection(this.dbPathPost).doc(id).update(value)
  }

  deletePost(id: string) {
    this.afs.collection(this.dbPathPost).doc(id).delete()
  }

  // deleteAllPosts(): Promise<void> {
  //   return this.postRef.remove()
  // }



  // createTag(item: Tag): void {
  //   this.tagRef.push(item)
  // }

  // updateTag(key: string, value: any): Promise<void> {
  //   return this.tagRef.update(key, value)
  // }

  // deleteTag(key: string): Promise<void> {
  //   return this.tagRef.remove(key)
  // }

  // getTagList(): AngularFireList<Tag> {
  //   return this.tagRef
  // }

  // deleteAllTags(): Promise<void> {
  //   return this.tagRef.remove()
  // }

}
