// post.component.ts

import {EventEmitter, Output, Component, Input, OnInit } from '@angular/core';

import { PostServiceComponent } from '../../services/post-service/post-service.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: any; // Change 'any' to a more specific type if possible
  @Input() showSaveButton = true;
  @Output() save = new EventEmitter<number>();

  constructor(private postService: PostServiceComponent) {}

  ngOnInit(): void {}

  savePost(postId: number) {
    // Emit an event to inform parent components
    this.save.emit(postId);
  }
}
