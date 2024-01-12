import { Component, inject } from '@angular/core';
import { Video } from "../../models/video";
import { VideoService } from '../../core/services/video.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  Videos: Video[] = [];
  totalVideos = 0;
  currentPage = 1;
  videosPerPage = 10;

  private router = inject(Router);
  private _videoService = inject(VideoService);

  ngOnInit() {
    this.getVideos();
  }

  async getVideos() {
    this.Videos = await this._videoService.getVideos().toPromise();
    this.totalVideos = this.Videos.length;
  }

  redirectToPlayer(videoId: string) {
    this.router.navigate(['player', videoId]);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
}
