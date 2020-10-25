import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Post } from '../../interfaces/post';



@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private dbPath = '/person'

  constructor(
    private db: AngularFireDatabase
  ) { 
    this.postRef = db.list(this.dbPath)
  }

    postRef: AngularFireList<Post> = null

    createCustomer(item: Post): void {
      this.postRef.push(item);
    }

    updateCustomer(key: string, value: any): Promise<void> {
      return this.postRef.update(key, value);
    }
   
    deleteCustomer(key: string): Promise<void> {
      return this.postRef.remove(key);
    }
   
    getCustomersList(): AngularFireList<Post> {
      return this.postRef;
    }
   
    deleteAll(): Promise<void> {
      return this.postRef.remove();
    }

}
