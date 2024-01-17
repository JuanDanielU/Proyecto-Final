import { Component, inject } from '@angular/core';
import { Video } from '../../models/video';
import { VideoService } from '../../core/services/video.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './user-videos.component.html',
  styleUrl: './user-videos.component.scss',
})
export class UserVideosComponent {
  userId = '';
  Videos: Video[] = [];
  totalVideos = 0;
  currentPage = 1;
  videosPerPage = 10;

  private router = inject(ActivatedRoute);
  private _router = inject(Router);
  private _videoService = inject(VideoService);
  private _authservice = inject(AuthService);

  ngOnInit() {
    this.userId = this.router.snapshot.paramMap.get('id')!;
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

  redirectToPlayer(videoId: string) {
    this._router.navigate(['player', videoId]);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
}
