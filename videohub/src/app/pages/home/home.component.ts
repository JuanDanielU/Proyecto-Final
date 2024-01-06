import { Component, inject } from '@angular/core';
import { Video } from "../../models/video";
import { VideoService } from '../../core/services/video.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  listVideos: Video[] = [];
  private _userService = inject(UserService);
  constructor(private _videoService: VideoService) {  }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
  return this._videoService.getVideos().subscribe((data) => {
    this.listVideos = data; // Asigna los datos a la lista de videos
  }, (error) => {
    console.log(error);
  });
}
}
