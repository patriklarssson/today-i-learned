import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../../interfaces/post';
import { Tag } from '../../interfaces/tag';

@Injectable({
  providedIn: 'root'
})

export class TagsService {

  private dbPathTags = 'tag'
  constructor(
    private afs: AngularFirestore
  ) {
  }

  searchTags(search: string): AngularFirestoreCollection<Tag> {    
    return this.afs.collection(this.dbPathTags, ref => ref.orderBy('tag', 'desc').startAt(search).limit(5))
  }
  
  createTag(item: Tag): Promise<string> {
    var idRef = this.afs.createId()
    return this.afs.collection(this.dbPathTags).doc(idRef).set(item)
      .then(x => {
        return idRef
      })
  }

  // getPostById(postId: string): AngularFirestoreCollection<Post> {
  //   return this.afs.collection(this.dbPathPost, ref => ref.where(firebase.firestore.FieldPath.documentId(), "==", postId))
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
