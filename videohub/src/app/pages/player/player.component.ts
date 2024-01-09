import { Component, inject } from '@angular/core';
import { Video } from '../../models/video';
import { VideoService } from '../../core/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  videoId = '';
  video = {} as Video;
  userPhoto = '';
  userName = '';
  private _userService = inject(UserService);
  private router = inject(ActivatedRoute);
  private _videoService = inject(VideoService);

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.videoId = params['id'];
    });
    this.getVideo();
  }

  async getVideo() {
    return this._videoService.getVideo(this.videoId).subscribe(
      (data) => {
        this.video = data;
        this._userService.getUser(this.video.userId).subscribe((data) => {
          this.userPhoto = data.photoURL;
          this.userName = data.name;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
