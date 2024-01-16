import { Component, inject } from '@angular/core';
import { Video } from '../../models/video';
import { VideoService } from '../../core/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatPaginatorModule, CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  videoId = '';
  video = {} as Video;
  Videos: Video[] = [];
  totalVideos = 0;
  currentPage = 1;
  videosPerPage = 3;

  private _router = inject(Router);
  private router = inject(ActivatedRoute);
  private _videoService = inject(VideoService);

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.videoId = params['id'];
    });
    this.getVideo();
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

  async likeVideo() {
    return this._videoService.getVideo(this.videoId).subscribe(
      (data) => {
        this.video = data;
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
