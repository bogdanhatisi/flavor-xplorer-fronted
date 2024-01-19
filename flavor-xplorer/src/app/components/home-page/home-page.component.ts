import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  postId: number;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private dialog: MatDialog,
    private postService: PostServiceComponent
  ) {}

  receivePostId($event: number){
    this.postId = $event;
    console.log(this.postId + "fjnsanbvgkdjsvndjkafvnjk");
  }

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

  logOut() {
    this.loginService.logout();
  }

//   savePost(postId: number) {
//     // Call the API to save the post
//     console.log(postId);
//     this.postService
//       .savePost(postId)
//       .then(() => {
//         // Emit an event to inform parent components
//         this.save.emit(postId);
//       })
//       .catch((error) => {
//         console.error('Error saving post:', error);
//       });
// }
}
