import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

  selectedFile: File

  constructor(
    private storageService: StorageService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }  

  processFile(imageInput: any) {
    this.selectedFile = imageInput.files[0]
  }

  save() {
    const blobRef = this.storageService.uploadPhotoToStorage(this.selectedFile)
    blobRef.then(x => this.authService.editProfilePicture(x))
    
  }
}
