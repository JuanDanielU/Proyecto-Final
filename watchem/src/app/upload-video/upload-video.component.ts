import { Component } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL  } from '@angular/fire/storage';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-upload-video',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule ],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.scss'
})
export class UploadVideoComponent {
  title = 'Upload Video';
  public video: any = {};
  constructor(public storage: Storage) {

  }

  chooseVideo(event: any): void {
    this.video = event.target.files[0];
  }

  uploadVideo() {
    const storageRef = ref(this.storage, this.video.name);
    const uploadTask = uploadBytesResumable(storageRef, this.video);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }
}
