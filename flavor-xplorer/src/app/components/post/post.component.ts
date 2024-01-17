// post.component.ts

import { Component, Input, OnInit } from '@angular/core';

import { PostServiceComponent } from '../../services/post-service/post-service.component';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor(private postService: PostServiceComponent) {}

  ngOnInit(): void {}
}
