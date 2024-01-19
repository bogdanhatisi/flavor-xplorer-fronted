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

  getUserPosts(userId: number): Promise<Post[]> {
    const postUrl = `${this.apiUrl}/users/${userId}/posts/`;
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

  getUserFeed(): Promise<Post[]> {
    const postUrl = `${this.apiUrl}/posts/feed`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    };

    return axios
      .get(postUrl, { headers })
      .then((response) => response.data.feed_posts)
      .catch((error) => {
        console.error('Error fetching feed posts:', error);
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
  savePost(postId: number): Promise<any> {
    const saveBookmarkUrl = `${this.apiUrl}/posts/${postId}/bookmark`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    return axios.post(saveBookmarkUrl, { headers })
    .then(response => {
      console.log('Post bookmarked successfully:', response);
    })
    .catch(error => {
      console.error('Error bookmarking post:', error);
      throw error;
    });
  }

  deleteBookmark(postId: number): Promise<any> {
    const deleteUrl = `${this.apiUrl}/posts/${postId}/unbookmark`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    return axios.delete(deleteUrl, { headers })
    .then(response => {
      console.log('Post unbookmarked successfully:', response);
    })
    .catch(error => {
      console.error('Error unbookmarking post:', error);
      throw error;
    });
  }

  getBookmarkedPosts(): Promise<Post[]> {
    const apiUrl = `${this.apiUrl}/posts/bookmarks`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  
    return axios
      .get<{ bookmarked_posts: Post[] }>(apiUrl, { headers })
      .then((response) => response.data.bookmarked_posts)
      .catch((error) => {
        console.error('Error fetching bookmarked posts:', error);
        throw error;
      });
  }
  
}
