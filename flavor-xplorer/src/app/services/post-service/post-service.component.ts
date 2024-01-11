// post-service.component.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceComponent {
  private apiUrl = 'https://flavorxplorer.onrender.com/api'; // Replace with your actual API URL
  private tokenKey = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3MDUwNzQ5MTB9.zjSm7VYCVO_2rxPlSnsyKIMb0MNnrb5_mleG5V_1mAc';

  constructor(private http: HttpClient) {}

  setJwtToken(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getPostData(): Observable<any> {
    const postUrl = `${this.apiUrl}/posts/1`; // Assuming your API endpoint for getting a post is '/posts/:id'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenKey}`
    });

    return this.http.get<any>(postUrl, { headers });
  }

  // Other methods for interacting with the API can follow the same pattern
  // ...

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
