import { Component, inject } from '@angular/core';
import { Video } from '../../models/video';
import { VideoService } from '../../core/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../core/services/comment.service';
import { Comment } from '../../models/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

interface CommentForm {
  text: FormControl<string>;
}
@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {

  disabled = true;
  Logged = false;

  currentUserId = '';
  currentUserPhoto = '';
  CurrentUserName = '';

  videoId = '';
  video = {} as Video;
  Videos: Video[] = [];
  totalVideos = 0;
  currentPage = 1;
  videosPerPage = 3;

  comment = {} as Comment;
  Comments: Comment[] = [];
  totalComments = 0;
  currentCommentPage = 1;
  commentsPerPage = 3;

  private formBuilder = inject(FormBuilder);
  private _commentService = inject(CommentService);
  private _router = inject(Router);
  private router = inject(ActivatedRoute);
  private _videoService = inject(VideoService);
  private _authService = inject(AuthService);

  commentForm: FormGroup<CommentForm> = this.formBuilder.group({
    text: this.formBuilder.control('',{
      validators: Validators.nullValidator,
      nonNullable: true,
    }),
  });

  ngOnInit() {
    this._authService.authState$.subscribe((data) => {
      if (!data) {
        return;
      }
      this.currentUserId = data.uid!;
      this.CurrentUserName = data.displayName!;
      this.currentUserPhoto = data.photoURL!;
      this.Logged = true;
    });
    this.router.params.subscribe((params) => {
      this.videoId = params['id'];
    });
    this.getVideo();
    this.getComments();
  }

  async onSubmit() {
    if (this.commentForm.controls.text.value === '') {
      this.disabled = true;
      return;
    }
    const newComment: Comment = {
      text: this.commentForm.value.text!,
      videoId: this.videoId,
      userId: this.currentUserId,
      fromUser: this.CurrentUserName,
      userPhoto: this.currentUserPhoto,
      createdAt: new Date(Date.now()),
      updatedAt: null,
      likes: [],
    };
    console.log(newComment);
    this._commentService.createComment(newComment).toPromise();
    this.commentForm.reset();
    window.location.reload();
  }

  async getVideo() {
    return this._videoService.getVideos().subscribe(
      (data) => {
        this.Videos = data.filter((video: { _id: string; }) => video._id !== this.videoId);
        this.totalVideos = this.Videos.length;
        this.video = data.find((data: { _id: string; }) => data._id === this.videoId) as Video;
        const index = this.Videos.findIndex((video) => video._id === this.videoId);
        if (index !== -1) {
          this.Videos.splice(index, 1);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getComments() {
    return this._commentService.getComments().subscribe(
      (data) => {
        this.Comments = data
        this.totalComments = this.Comments.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  redirectToPlayer(videoId: string) {
    this._router.navigate(['player', videoId]).then(() => { window.location.reload(); })
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
}
