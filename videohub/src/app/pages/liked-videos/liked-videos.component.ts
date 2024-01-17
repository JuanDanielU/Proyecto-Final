import { Component, inject } from '@angular/core';
import { Video } from "../../models/video";
import { VideoService } from '../../core/services/video.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.scss'
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
    this.userId = this._authservice.userId();
    this.getVideos();
  }

  async getVideos() {
    this.Videos = await this._videoService.getLikedVideos(this.userId).toPromise();
  }

  redirectToPlayer(videoId: string) {
    this._router.navigate(['player', videoId]);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
}
