import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostServiceComponent } from 'src/app/services/post-service/post-service.component';
import { Post } from 'src/app/models/post.interface';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
  bookmarkedPosts: Post[];
  user: User = {};

  constructor(private postService: PostServiceComponent, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.postService
    .getBookmarkedPosts()
    .then((response) => {
      this.bookmarkedPosts = response;
      console.log('Bookmarked posts:', this.bookmarkedPosts);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
  }

  deleteBookmark(postId: number) {
    // Call the API to delete the bookmark
    this.postService
      .deleteBookmark(postId)
      .then(() => {
        // Remove the deleted post from the local array
        this.bookmarkedPosts = this.bookmarkedPosts.filter((post) => post.id !== postId);
      })
      .catch((error) => {
        console.error('Error deleting bookmark:', error);
      });
  }}