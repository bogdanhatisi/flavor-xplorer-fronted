import { Component, Input } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { UserServiceComponent } from 'src/app/services/user-service/user-service.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private userService: UserServiceComponent,
    private route: ActivatedRoute
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
}
