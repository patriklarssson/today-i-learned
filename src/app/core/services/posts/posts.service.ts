import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { Post } from '../../interfaces/post';
import { Tag } from '../../interfaces/tag';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  private dbPathPosts = '/posts'
  private dbPathTags = '/tags'

  constructor(
    private db: AngularFireDatabase,
  ) { 
    this.postRef = db.list(this.dbPathPosts)
    this.tagRef = db.list(this.dbPathTags)
  }

    postRef: AngularFireList<Post> = null
    tagRef: AngularFireList<Tag> = null





    getPostList(): AngularFireList<Post> {
      return this.postRef      
    }

    getPostById(postId: string) {
      return this.db.object(`posts/${postId}`)
    }

    createPost(item: Post): Promise<string> {         
      return this.postRef.push(item).then(x => {
        return x.key
      })
    }

    updatePost(key: string, value: Post): Promise<void> {      
      return this.postRef.update(key, value)
    }
   
    deletePost(key: string): Promise<void> {
      return this.postRef.remove(key)
    }  
   
    deleteAllPosts(): Promise<void> {
      return this.postRef.remove()
    }



    createTag(item: Tag): void {
      this.tagRef.push(item)
    }

    updateTag(key: string, value: any): Promise<void> {
      return this.tagRef.update(key, value)
    }
   
    deleteTag(key: string): Promise<void> {
      return this.tagRef.remove(key)
    }
   
    getTagList(): AngularFireList<Tag> {
      return this.tagRef
    }
   
    deleteAllTags(): Promise<void> {
      return this.tagRef.remove()
    }

}
