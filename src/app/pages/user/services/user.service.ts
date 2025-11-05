import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httprequest = inject(HttpClient);

  public url: string = 'http://localhost:3000/users';

  getUsers(): Observable<User[]> {
    return this.httprequest.get<User[]>(this.url);
  }

  getUserById(id: number): Observable<User> {
    return this.httprequest.get<User>(`${this.url}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.httprequest.post<User>(this.url, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httprequest.put<User>(`${this.url}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.httprequest.delete<void>(`${this.url}/${id}`);
  }

}
