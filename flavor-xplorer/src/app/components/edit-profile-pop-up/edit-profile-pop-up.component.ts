import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserServiceComponent } from 'src/app/services/user-service/user-service.component';

@Component({
  selector: 'app-edit-profile-pop-up',
  templateUrl: './edit-profile-pop-up.component.html',
  styleUrls: ['./edit-profile-pop-up.component.css'],
})
export class EditProfilePopUpComponent {
  @Input() user: User;
  avatarFile: File;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserServiceComponent
  ) {}

  onSaveClick() {
    this.user.id = parseInt(localStorage.getItem('user_id')!);
    if (this.avatarFile) {
      // If there is a new avatar file, upload it first
      this.userService
        .uploadAvatar(this.avatarFile)
        .then((avatarUrl) => {
          // Update the user profile with the new avatar URL
          this.user.avatar = avatarUrl;
          return this.updateUserProfile();
        })
        .then(() => {
          // After updating profile, close the modal
          this.activeModal.close();
        })
        .catch((error) => {
          console.error('Error updating profile or uploading avatar', error);
          // Handle error updating profile or uploading avatar
        });
    } else {
      // If no new avatar file, simply update the user profile
      this.updateUserProfile()
        .then(() => {
          // After updating profile, close the modal
          this.activeModal.close('save');
        })
        .catch((error) => {
          console.error('Error updating profile', error);
          // Handle error updating profile
        });
    }
  }

  updateUserProfile(): Promise<string> {
    // Update the user profile
    return this.userService.updateUserProfile(this.user);
  }

  onAvatarChange(event: any) {
    this.avatarFile = event.target.files[0];
  }
}
