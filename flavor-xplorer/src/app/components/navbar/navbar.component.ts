import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onHome() {
    this.router.navigateByUrl('home');
  }

  onProfile() {
    // send the id to the account
    let id = localStorage.getItem('user_id');
    this.router.navigateByUrl(`profile/${id}`);
  }

  onExplore() {
    this.router.navigateByUrl('explore');
  }

  onSubmitSearch(event: any) {
    const inputValue = event.target.value;

    console.log('Ai scris: ' + inputValue + '! Bravo prostule!');
  }
}
