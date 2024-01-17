import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comment } from "../../models/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = 'http://localhost:4000/api/comments/';

  constructor(private http: HttpClient) {}

  getComments(): Observable<any> {
    return this.http.get(this.url);
  }

  createComment(comment: Comment): Observable<any> {
    return this.http.post(this.url, comment);
  }

  getComment(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  getCommentsByVideoId(videoId: string): Observable<any> {
    return this.http.get(this.url + videoId);
  }

  getLikedComments(userId: string): Observable<any> {
    return this.http.get(this.url + userId);
  }

  updateComment(id: string, comment: Comment): Observable<any> {
    return this.http.put(this.url + id, comment);
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
