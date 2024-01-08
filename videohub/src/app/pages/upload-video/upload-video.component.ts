import { Component, ViewChild, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL  } from '@angular/fire/storage';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { VideoService } from '../../core/services/video.service';
import { Video } from '../../models/video';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { User } from '../../models/user';
import { AuthService } from '../../core/services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
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
    MatSnackBarModule,
    MatProgressBarModule,
  ],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.scss'
})
export class UploadVideoComponent {
  videoName = false;
  progress = 0;
  disabled = false;
  hide = true;
  formBuilder = inject(FormBuilder);
  private _videoService = inject(VideoService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private _userService = inject(UserService);
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

  public video: any = {};
  constructor(public storage: Storage) {}

  chooseVideo(event: any): void {
    this.hide = false;
    this.video = event.target.files[0];
    this.videoName = true;
    const videoThumbnail = document.getElementById('videoThumbnail') as HTMLVideoElement;

    if (this.video) {
      const videoURL = URL.createObjectURL(this.video);
      videoThumbnail.src = videoURL;
    } else {
      videoThumbnail.src = '#';
    }
  }

  async uploadVideo() {
    if (this.form.invalid) return;
    this.disabled = true;
    const storageRef = ref(this.storage, this.video.name);
    const uploadTask = uploadBytesResumable(storageRef, this.video);

    uploadTask.on('state_changed',
      (snapshot) => {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this._authService.authState$.subscribe((user) => {
            if (user) {
              this._userService.getUser(user.uid).subscribe((dbUser: User) => {

                const videoData: Video = {
                title: this.form.value.title!,
                description: this.form.value.description!,
                size: this.video.size,
                uploadedAt: new Date(),
                updatedAt: null,
                views: 0,
                likes: 0,
                comments: [],
                userId: user.uid,
                fromUser: dbUser.name,
                userPhoto: user.photoURL!,
                url: downloadURL,
                };
                this._videoService.createVideo(videoData).toPromise();

                dbUser.videos.push(videoData);
                this._userService.updateUser(dbUser._id, dbUser).toPromise();
              });
            }
          });
        });

      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/');
      });
    });
  }

  openSnackBar() {
    return this._snackBar.open('Video uploaded successfully', 'Close', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'end',
      });
  }
}
