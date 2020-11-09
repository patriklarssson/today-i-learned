import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

// class ImageSnippet {
//   constructor(public src: string, public file: File) {}
// }

export class EditProfileComponent implements OnInit {

  selectedFile

  constructor(
    private authService: AuthService,
    private storageService: StorageService
    ) { }

  ngOnInit(): void {
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = {src: event.target.result, file: file}      
    })
    reader.readAsDataURL(file);
  }

  save() {
    this.storageService.uploadPhotoToStorage(this.selectedFile)
  }
}
