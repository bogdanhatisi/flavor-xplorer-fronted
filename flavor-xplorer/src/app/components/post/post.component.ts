// post.component.ts

import { Component, OnInit } from '@angular/core';

import { PostServiceComponent } from '../../services/post-service/post-service.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: any; // Change 'any' to a more specific type if possible

  constructor(private postService: PostServiceComponent) {}

  ngOnInit(): void {
    this.postService.getPostData().subscribe((data: any) => {
      this.post = data;
      console.log('Value of this.post:', this.post);
    });
  }

  getRatingArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index + 1);
  }
}
