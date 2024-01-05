import { Component } from '@angular/core';
import { Video } from "../../models/video";
import { VideoService } from '../../core/services/video.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  listVideos: Video[] = [];

  constructor(private _videoService: VideoService) {  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    return this._videoService.getVideos().subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    }
    );
  }
}
