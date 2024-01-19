import { Component, Input } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UserServiceComponent } from 'src/app/services/user-service/user-service.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PostServiceComponent } from 'src/app/services/post-service/post-service.component';
import { Post } from 'src/app/models/post.interface';
import { PostComponent } from '../post/post.component';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfilePopUpComponent } from '../edit-profile-pop-up/edit-profile-pop-up.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: User = {};
  @Input() targetUserId: number;
  followers: string = '';
  following: string = '';
  followersNumber: number = 0;
  followingNumber: number = 0;
  currentUserId: number = parseInt(localStorage.getItem('user_id')!);
  userPosts: Post[];

  constructor(
    private postService: PostServiceComponent,
    private userService: UserServiceComponent,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Fetch the user data
    this.route.paramMap.subscribe((params) => {
      this.targetUserId = parseInt(params.get('id')!);
    });
    console.log(this.targetUserId);
    this.userService
      .findOne(this.targetUserId) // Replace '1' with the actual user ID
      .then((user) => {
        this.user = user;
        if (user.gender == 'prefer_not_to_say') {
          user.gender = 'Prefer not to say';
        }
        console.log('User Profile Data:', this.user);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });

    this.userService
      .getFollowers(this.targetUserId) // Replace '1' with the actual user ID
      .then((followers) => {
        this.followers = followers;
        this.followersNumber = followers.length;
        console.log('User followers:', this.followersNumber);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });

    this.userService
      .getFollowing(this.targetUserId) // Replace '1' with the actual user ID
      .then((following) => {
        this.following = following;
        this.followingNumber = following.length;
        console.log('User following:', this.followingNumber);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });

    this.postService
      .getUserPosts(this.targetUserId)
      .then((response) => {
        this.userPosts = response;
        console.log('User posts:', this.userPosts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }

  onFollowClick() {
    console.log('Merge followingu');
    this.userService
      .followOrUnfollowUser(this.targetUserId, 'follow')
      .then((message) => {
        console.log('User now follows:', message);
      })
      .catch((error) => {
        console.error('Error following:', error);
      });
  }

  onUnFollowClick() {
    console.log('Merge unfollowingu');
    this.userService
      .followOrUnfollowUser(this.targetUserId, 'unfollow')
      .then((message) => {
        console.log('User now follows:', message);
      })
      .catch((error) => {
        console.error('Error following:', error);
      });
  }

  openEditProfileModal() {
    const modalRef = this.modalService.open(EditProfilePopUpComponent);
    modalRef.componentInstance.user = { ...this.user }; // Pass a copy of the user data to the modal
    modalRef.result.then((result) => {
      if (result === 'save') {
        // Handle any logic after saving changes, if needed
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
  goToBookmarks() {
    // Navigate to the bookmarks page
    this.router.navigate(['bookmarks']);
  }
}
