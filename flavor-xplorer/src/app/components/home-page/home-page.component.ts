import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  private showModal = false;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  switchModal() {
    this.showModal = !this.showModal;
    console.log('Modal is ' + this.showModal);
  }

  logOut() {
    this.loginService.logout();
  }
}
