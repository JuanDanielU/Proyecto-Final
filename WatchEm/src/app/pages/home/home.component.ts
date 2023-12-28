import { Component } from '@angular/core';
import { VideoService } from '../../services/Video.service';
import { error } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  // constructor(private _videoService: VideoService) { }

  // ngOnInit(): void {
  //   this.getVideos();
  // }

  // getVideos() {
  //   this._videoService.getVideos().subscribe(data => {
  //     console.log(data);
  //   }, error => {
  //     console.log(error);
  //   })
  // }
}
