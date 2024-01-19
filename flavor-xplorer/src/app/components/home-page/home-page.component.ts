import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NewPostPopUpComponent } from 'src/app/components/new-post-pop-up/new-post-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { PostServiceComponent } from 'src/app/services/post-service/post-service.component';
import { Post } from 'src/app/models/post.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  postsFeed: Post[];
  constructor(
    private dialog: MatDialog,
    private postService: PostServiceComponent,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.postService
      .getUserFeed()
      .then((response) => {
        this.postsFeed = response;
        console.log('User feed:', this.postsFeed);
      })
      .catch((error) => {
        console.error('Error fetching posts feed:', error);
      });
  }

  switchModal() {
    this.dialog.open(NewPostPopUpComponent);
  }

  receivePostIdAndSaveToBookmarks(postId: number) {
    console.log(postId);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    this.http.post(environment.baseUrl + `/posts/${postId}/bookmark`, null, { headers })
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('Post added to bookmarks successfully:', response);
          }
        },
        error: (err: any) => {
          if (err.status === 201) {
            console.log('Post added to bookmarks successfully:', err);
          } else {
            console.error('Error adding post:', err);
          }
        },
      });
  }
}
