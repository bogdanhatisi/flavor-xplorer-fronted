import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostServiceComponent } from 'src/app/services/post-service/post-service.component';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
  bookmarkedPosts: Post[];
  userId: number; // Add userId property

  constructor(private postService: PostServiceComponent, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Get userId from route parameters
    this.route.params.subscribe((params) => {
      const userIdParam = params['userId'];
      
      // Check if userIdParam is present and a valid number
      if (userIdParam && !isNaN(userIdParam as any)) {
        this.userId = +userIdParam;
        
        this.postService
  .getBookmarkedPosts(this.userId)  // Provide the userId of the user whose bookmarked posts you want to retrieve
  .then((response) => {
    this.bookmarkedPosts = response;
    console.log('Bookmarked posts:', this.bookmarkedPosts);
  })
  .catch((error) => {
    console.error('Error fetching bookmarked posts:', error);
  });
      } //else {
        //console.error('Invalid userId:', userIdParam);
         //Handle the case where userId is not present or not a valid number
        // For example, you could redirect the user to an error page or a default view
      //}
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