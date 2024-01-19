import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { user } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('form') form: NgForm | undefined;
  submissionType: 'login' | 'join' = 'login';
  genderValue: number = -1;
  selectedGender: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.submissionType === 'login') {
      const { username, password } = this.form?.value;

      if (!username || !password) return;

      console.log(username, ' ', password);

      return this.loginService.login(username, password).subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    } else {
      const {
        username,
        email,
        first_name,
        last_name,
        gender,
        password,
        password_confirmation,
      } = this.form?.value;
      //     console.log(email, firstName, gender)

      if (password != password_confirmation) {
        alert("The passwords don't match");
        return;
      }
      this.setGenderValue(this.selectedGender);
      const newUser: user = {
        username,
        email,
        first_name,
        last_name,
        gender: this.genderValue,
        password,
        password_confirmation,
      };

      return this.loginService.register(newUser).subscribe(() => {
        this.toggleText();
      });
    }
  }

  toggleText() {
    if (this.submissionType === 'login') {
      this.submissionType = 'join';
    } else if (this.submissionType === 'join') {
      this.submissionType = 'login';
    }
  }

  setGenderValue(gender: string) {
    if (gender === 'male') {
      this.genderValue = 0;
    } else if (gender === 'female') {
      this.genderValue = 1;
    } else if (gender === 'other') {
      this.genderValue = 2;
    }
  }
}
