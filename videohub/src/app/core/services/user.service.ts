import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:4000/api/users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  getSubscribedUsers(userId: string): Observable<any> {
    return this.http.get(this.url + userId);
  }

  updateUser(id: string, user: User): Observable<any> {
    return this.http.put(this.url + id, user);
  }
}
