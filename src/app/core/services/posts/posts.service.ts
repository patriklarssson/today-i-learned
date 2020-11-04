import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filters } from '../../interfaces/filters';
import { Post } from '../../interfaces/post';
import { Tag } from '../../interfaces/tag';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private dbPathPost = 'post'
  constructor(
    private afs: AngularFirestore
  ) {
  }

  getPostList(): AngularFirestoreCollection<Post> {
    return this.afs.collection(this.dbPathPost, ref =>
      ref.orderBy("date", "desc")
        .limit(10)
    )
  }

  getFilteredPosts(filter: Filters): AngularFirestoreCollection<Post> {
    return this.afs.collection(this.dbPathPost, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (filter.tag) { query = query.where("tags", "array-contains", filter.tag) }
      if (filter.type) { query = query.where("language", "==", filter.type) }
      if (filter.orderCategory) { query = query.orderBy(filter.orderCategory.toLowerCase(), filter.orderBy) }
      return query
    }
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

  incrementView(id: string) {
    this.afs.collection(this.dbPathPost).doc(id).update({'views': firebase.firestore.FieldValue.increment(1)})
  }

}
