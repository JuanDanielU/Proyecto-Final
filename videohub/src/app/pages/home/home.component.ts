import { Component, inject } from '@angular/core';
import { Video } from "../../models/video";
import { VideoService } from '../../core/services/video.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  listVideos: Video[] = [];
  totalVideos = 0;
  currentPage = 1;
  videosPerPage = 30;

  private _videoService = inject(VideoService);

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    return this._videoService.getVideos().subscribe((data) => {
      this.listVideos = data; // Asigna los datos a la lista de videos
      this.totalVideos = this.listVideos.length;
    }, (error) => {
      console.log(error);
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
  }
}
