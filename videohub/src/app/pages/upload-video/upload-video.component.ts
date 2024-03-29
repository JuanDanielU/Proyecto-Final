import { Component, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { VideoService } from '../../core/services/video.service';
import { Video } from '../../models/video';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

interface VideoForm {
  title: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-upload-video',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.scss',
})
export class UploadVideoComponent {
  videoName = false;
  userId = '';
  userPhoto = '';
  userName = '';
  progress = 0;
  disabled = false;
  hide = true;
  videoSelected = true;
  hideUploadButton = false;
  formBuilder = inject(FormBuilder);
  private _videoService = inject(VideoService);
  private _authService = inject(AuthService);

  form: FormGroup<VideoForm> = this.formBuilder.group({
    title: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    description: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  public video: any;
  _Video: Video = {
    title: '',
    description: '',
    uploadedAt: new Date(),
    updatedAt: null,
    comments: [],
    likes: [],
    url: '',
    userId: '',
    userPhoto: '',
    fromUser: '',
  };
  constructor(public storage: Storage) {}

  ngOnInit(): void {
    this._authService.authState$.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.userName = user.displayName!;
        this.userPhoto = user.photoURL!;
      }
    });
  }

  async videoUploaded(downloadURL: string) {
    this._Video.url = downloadURL;
    this._Video.uploadedAt = new Date(Date.now());
    this._Video.userId = this.userId;
    this._Video.fromUser = this.userName;
    this._Video.userPhoto = this.userPhoto!;
    this._videoService.createVideo(this._Video).toPromise();
  }

  chooseVideo(event: any): void {
    this.hide = false;
    this.video = event.target.files[0];
    this.videoName = true;
    const videoThumbnail = document.getElementById(
      'videoThumbnail'
    ) as HTMLVideoElement;

    if (this.video) {
      this.videoSelected = true;
      const videoURL = URL.createObjectURL(this.video);
      videoThumbnail.src = videoURL;
    } else {
      this.videoSelected = false;
      videoThumbnail.src = '#';
    }
  }

  async uploadVideo() {
    if (this.form.invalid) return;
    if (!this.video) {
      this.videoSelected = false;
      return;
    }
    console.log(this.video);
    this.hideUploadButton = true;
    this._Video.title = this.form.value.title!;
    this._Video.description = this.form.value.description!;
    this.disabled = true;
    const storageRef = ref(this.storage, this.video.name);
    const uploadTask = uploadBytesResumable(storageRef, this.video);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (this.progress === 100) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.videoUploaded(downloadURL)
        });
      }
    );
  }
}
