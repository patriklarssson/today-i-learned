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

  uploadPhotoToStorage(file) {
    const filePath = (~~(Math.random() * 10000000000000)).toString()
    return this.storage.upload(filePath, file).
      then(snapshot => snapshot.ref.getDownloadURL())
  }
}
