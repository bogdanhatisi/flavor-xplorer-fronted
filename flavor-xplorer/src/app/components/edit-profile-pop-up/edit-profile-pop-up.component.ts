import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit-profile-pop-up',
  templateUrl: './edit-profile-pop-up.component.html',
  styleUrls: ['./edit-profile-pop-up.component.css'],
})
export class EditProfilePopUpComponent {
  @Input() user: User; // Assuming you have a User interface

  constructor(public activeModal: NgbActiveModal) {}

  // Add form controls and logic for updating the profile
  // You may want to add a method to handle form submission
  onSaveClick() {
    // Implement the logic to update the user profile
    // You can use a service to handle the update operation
    // After updating, you may want to close the modal
    this.activeModal.close();
  }
}
