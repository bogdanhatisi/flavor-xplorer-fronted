// post.component.ts

import {EventEmitter, Output, Component, Input, OnInit } from '@angular/core';

import { PostServiceComponent } from '../../services/post-service/post-service.component';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post; // Change 'any' to a more specific type if possible
  @Input() showSaveButton = true;
  @Input() showDeleteButton = true;
  @Output() save = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor(private postService: PostServiceComponent) {}

  ngOnInit(): void {}

  savePost() {
    this.save.emit(this.post.id);
  }

  deletePost() {
    this.delete.emit(this.post.id)
  }
}
