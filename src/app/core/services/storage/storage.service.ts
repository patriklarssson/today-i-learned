import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  downloadURL: Observable<string>;
  fb

  constructor(
    private storage: AngularFireStorage
    ) { }

    uploadPhotoToStorage(photoSrc) {
      console.log(photoSrc);
      
      var n = Date.now();
      const file = photoSrc
      const filePath = `Photos/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`Photos/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                this.fb = url;
              }
              console.log(this.fb);
            });
          })
        )
        .subscribe(url => {
          if (url) {
            console.log(url);
          }
        });
    }

}
