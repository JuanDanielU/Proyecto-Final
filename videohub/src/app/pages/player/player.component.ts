import { Component, inject } from '@angular/core';
import { Video } from '../../models/video';
import { VideoService } from '../../core/services/video.service';
import { ActivatedRoute } from '@angular/router';
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
        this.userPhoto = this.video.userPhoto;
        this.userName = this.video.fromUser;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
