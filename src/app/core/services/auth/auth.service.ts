import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>
  isAdmin = new Subject<boolean>();

  constructor(
    private firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user = firebaseAuth.authState;
    this.user.subscribe((user => {
      if(user)
      this.checkIsAdmin(user.uid)
    }))
  }

  checkIsAdmin(userUid) {
    this.afs.collection("admin", ref => ref.where("userUID", "==", userUid)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(x => {
      if (x.length > 0)
        this.isAdmin.next(true)
      else 
      this.isAdmin.next(false)
    })
  }

  signup(email: string, password: string, displayName?: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(userData => {
        userData.user.updateProfile({
          displayName: displayName ? displayName : email[0].toUpperCase() + email.slice(1).split('@')[0].split('.')[0]         
        })
      })
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
  }
}