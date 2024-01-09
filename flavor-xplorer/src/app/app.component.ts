import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPostPopUpComponent } from './new-post-pop-up/new-post-pop-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dialog: MatDialog) {} 

  openModal(): void {
    this.dialog.open(NewPostPopUpComponent);
  }
}
