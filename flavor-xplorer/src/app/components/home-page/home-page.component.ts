import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NewPostPopUpComponent } from 'src/app/components/new-post-pop-up/new-post-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { PostServiceComponent } from 'src/app/services/post-service/post-service.component';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  postsFeed: Post[];
  constructor(
    private dialog: MatDialog,
    private postService: PostServiceComponent
  ) {}

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


  searchText:string = '';

  onSearchTextEntered(searchValue:string){
    this.searchText = searchValue;
  }

}
