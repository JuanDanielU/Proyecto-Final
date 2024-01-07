import { Component, inject } from '@angular/core';
import { Video } from "../../models/video";
import { VideoService } from '../../core/services/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  videoId = '';
  video = {} as Video;
  private router = inject(ActivatedRoute);
  private _videoService = inject(VideoService);

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.videoId = params['id'];
    });
    this.getVideo();
  }

  getVideo() {
    return this._videoService.getVideo(this.videoId).subscribe((data) => {
      this.video = data;
    }, (error) => {
      console.log(error);
    });
  }
}
