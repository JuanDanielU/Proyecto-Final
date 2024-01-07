import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Video } from "../../models/video";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  url = 'http://localhost:4000/api/videos/';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<any> {
    return this.http.get(this.url);
  }

  createVideo(video: Video): Observable<any> {
    return this.http.post(this.url, video);
  }

  getVideo(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }
}
