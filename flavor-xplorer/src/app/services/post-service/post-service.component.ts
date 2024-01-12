// post-service.component.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import axios, { AxiosResponse } from 'axios';
@Injectable({
  providedIn: 'root',
})
export class PostServiceComponent {
  private apiUrl = 'https://flavorxplorer.onrender.com/api'; // Replace with your actual API URL
  private tokenKey = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  setJwtToken(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
  }

  getLoggedUserPosts(userId: number): Promise<Post[]> {
    const postUrl = `${this.apiUrl}user/${userId}/posts/`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    };

    return axios
      .get(postUrl, { headers })
      .then((response) => response.data.user_posts)
      .catch((error) => {
        console.error('Error fetching user posts:', error);
        throw error; // Re-throw the error to handle it in the calling code
      });
  }

  getPostData(postId: string): Promise<Post> {
    const postUrl = `${this.apiUrl}/posts/${postId}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    };

    return axios
      .get(postUrl, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching post data:', error);
        throw error; // Re-throw the error to handle it in the calling code
      });
  }
}
