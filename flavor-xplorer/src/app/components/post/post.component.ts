// post.component.ts

import {EventEmitter, Output, Component, Input, OnInit } from '@angular/core';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { PostServiceComponent } from '../../services/post-service/post-service.component';
import { Post } from 'src/app/models/post.interface';
import {PostDetailComponent} from "../post-detail/post-detail.component";


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

  constructor(private postService: PostServiceComponent, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  savePost() {
    this.save.emit(this.post.id);
  }

  deletePost() {
    this.delete.emit(this.post.id)
  }

  openPostDetail() {
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(PostDetailComponent, {
      ...dialogConfig,
      data: {post: this.post} // Pass the post data to the dialog component
    });
  }
}
