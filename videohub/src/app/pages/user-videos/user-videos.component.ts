import { Component, inject } from '@angular/core';
import { Video } from '../../models/video';
import { VideoService } from '../../core/services/video.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './user-videos.component.html',
  styleUrl: './user-videos.component.scss',
})
export class UserVideosComponent {
  userId = <any>'';
  Videos: Video[] = [];
  totalVideos = 0;
  currentPage = 1;
  videosPerPage = 10;

  private router = inject(ActivatedRoute);
  private _router = inject(Router);
  private _videoService = inject(VideoService);

  ngOnInit() {
    this.userId = this.router.snapshot.paramMap.get('id');
    this.getVideos();
  }

  async getVideos() {
    this._videoService.getVideos().subscribe((videos) => {
      this.Videos = videos.filter((video: Video) => {
        return video.userId === this.userId;
      });
      this.totalVideos = this.Videos.length;
    });
  }

  async deleteVideo(videoId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this video?');
    if (confirmDelete) {
      this._videoService.deleteVideo(videoId).subscribe(() => {
        this.getVideos();
      });
    }
  }

  redirectToPlayer(videoId: string) {
    this._router.navigate(['player', videoId]);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
}
