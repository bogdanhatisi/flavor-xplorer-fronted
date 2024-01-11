import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NewPostPopUpComponent } from 'src/app/components/new-post-pop-up/new-post-pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  switchModal() {
    this.dialog.open(NewPostPopUpComponent);
  }

  logOut() {
    this.loginService.logout();
  }
}
