import { Component, inject } from '@angular/core';
import { Video } from "../../models/video";
import { VideoService } from '../../core/services/video.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  search = '';
  Videos: Video[] = [];
  totalVideos = 0;
  currentPage = 1;
  videosPerPage = 10;

  private _router = inject(Router);
  private router = inject(ActivatedRoute);
  private _videoService = inject(VideoService);

  ngOnInit() {
    this.router.params.subscribe((params) => {
      if (params['search']) {
        this.search = params['search'];
      }
    });
    this.getVideos();
  }

  async getVideos() {
    this.Videos = await this._videoService.getVideos().toPromise();
    this.totalVideos = this.Videos.length;
    this.Videos.find((video) => {
        this.Videos = this.Videos.filter((video) =>
          video.title.toLowerCase().includes(this.search.toLowerCase())
        );
    });
  }

  redirectToPlayer(videoId: string) {
    this._router.navigate(['player', videoId]);
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
}
