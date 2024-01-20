import { Injectable } from '@angular/core';
import axios from 'axios';
import {postComment} from "../../models/postComment.interface";
@Injectable({
  providedIn: 'root',
})
export class PostDetailService {
  private apiUrl = 'https://flavorxplorer.onrender.com/api'; // Replace with your actual API URL
  private tokenKey = localStorage.getItem('token');

  async getAllPostComments(postId: number, page = 1, allComments: postComment[] = []): Promise<postComment[]> {
    const commentUrl = `${this.apiUrl}/posts/${postId}/comments?page=${page}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    };

    try {
      const response = await axios.get(commentUrl, { headers });
      const responseData = response.data; // Assuming the response is an object containing 'comments' and 'pages_left' properties

      // Check if 'comments' property exists in the response
      if (responseData && responseData.comments) {
        const comments = responseData.comments;

        // Add the comments from the current page to the aggregated list
        allComments = [...allComments, ...comments];

        // Check if there are more pages
        if (responseData.pages_left > 0) {
          // If there is a next page, recursively call the function with the incremented page number
          return this.getAllPostComments(postId, page + 1, allComments);
        } else {
          // If no more pages, return the aggregated list of comments
          return allComments;
        }
      } else {
        // Handle the case where 'comments' property is missing in the response
        console.error('Error: "comments" property not found in the response');
        return allComments; // Return the aggregated list even if there's an issue with the response
      }
    } catch (error) {
      console.error('Error fetching post\'s comments:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }

  async addComment(postId: number, comment: string): Promise<postComment> {
    const commentUrl = `${this.apiUrl}/posts/${postId}/comments`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    };

    try {
      const response = await axios.post(commentUrl, comment, { headers });
      const addedComment = response.data; // Assuming the response contains the newly added comment

      return addedComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
}
