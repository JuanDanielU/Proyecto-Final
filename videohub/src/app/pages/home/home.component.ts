import { Component, inject } from '@angular/core';
import { Video } from "../../models/video";
import { VideoService } from '../../core/services/video.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatButtonModule],
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

  reloadPage() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/home']);
    });
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
