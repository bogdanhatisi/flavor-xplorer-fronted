import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UserServiceComponent } from 'src/app/services/user-service/user-service.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: User = {};
  followers: string = '';
  following: string = '';
  followersNumber: number = 0;
  followingNumber: number = 0;
  userId: string = '4';
  currentUserId = 7;

  constructor(private userService: UserServiceComponent) {}

  ngOnInit(): void {
    // Fetch the user data
    this.userService
      .findOne(this.currentUserId) // Replace '1' with the actual user ID
      .then((user) => {
        this.user = user;
        console.log('User Profile Data:', this.user);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });

    this.userService
      .getFollowers(this.currentUserId) // Replace '1' with the actual user ID
      .then((followers) => {
        this.followers = followers;
        this.followersNumber = followers.length;
        console.log('User followers:', this.followersNumber);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });

    this.userService
      .getFollowing(this.currentUserId) // Replace '1' with the actual user ID
      .then((following) => {
        this.following = following;
        this.followingNumber = following.length;
        console.log('User following:', this.followingNumber);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }

  onFollowClick() {
    console.log('Merge followingu');
    this.userService
      .followOrUnfollowUser(5, 'follow')
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
      .followOrUnfollowUser(5, 'unfollow')
      .then((message) => {
        console.log('User now follows:', message);
      })
      .catch((error) => {
        console.error('Error following:', error);
      });
  }
}
