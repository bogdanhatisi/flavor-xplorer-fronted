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
  userId: string = '5';

  constructor(private userService: UserServiceComponent) {}

  ngOnInit(): void {
    // Fetch the user data
    this.userService
      .findOne(5) // Replace '1' with the actual user ID
      .then((user) => {
        this.user = user;
        console.log('User Profile Data:', this.user);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });

    this.userService
      .getFollowers(5) // Replace '1' with the actual user ID
      .then((followers) => {
        this.followers = followers;
        this.followersNumber = followers.length;
        console.log('User followers:', this.followersNumber);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });

    this.userService
      .getFollowing(5) // Replace '1' with the actual user ID
      .then((following) => {
        this.following = following;
        this.followingNumber = following.length;
        console.log('User following:', this.followingNumber);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }
}
