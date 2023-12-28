import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  url = 'http://localhost:4200/api/videos';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<any> {
    return this.http.get(this.url);
  }
}
