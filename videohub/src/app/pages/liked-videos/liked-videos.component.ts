import { Component, inject } from '@angular/core';
import { Video } from '../../models/video';
import { VideoService } from '../../core/services/video.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.scss',
})
export class LikedVideosComponent {
  userId = '';
  Videos: Video[] = [];
  totalVideos = 0;
  currentPage = 1;
  videosPerPage = 10;

  private _router = inject(Router);
  private _videoService = inject(VideoService);
  private _authservice = inject(AuthService);

  ngOnInit() {
    this.getVideos();
  }

  async getVideos() {
    this._videoService.getVideos().subscribe((videos) => {
      this.Videos = videos.filter((video: { likes: string }) =>
        video.likes.includes(this._authservice.userId())
      );
      this.totalVideos = this.Videos.length;
    });
  }

  sortBy(sort: string) {
    if (sort === 'newest') {
      this.Videos.sort((a, b) => {
        return <any>new Date(b.uploadedAt) - <any>new Date(a.uploadedAt);
      });
    } else if (sort === 'oldest') {
      this.Videos.sort((a, b) => {
        return <any>new Date(a.uploadedAt) - <any>new Date(b.uploadedAt);
      });
    } else if (sort === 'top') {
      this.Videos.sort((a, b) => {
        return b.likes.length - a.likes.length;
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
