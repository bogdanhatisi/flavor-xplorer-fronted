import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";
import { User } from "../model/user";

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginPage implements OnInit {
    @ViewChild('form') form : NgForm | undefined;
    submissionType : 'login' | 'join' = 'login';

    constructor(private loginService : LoginService, private router : Router) {}

    ngOnInit(): void {}

    onSubmit() {
        const {email, password} = this.form?.value;

        if (!email || !password) return;

        if (this.submissionType === 'login') {
            return this.loginService.login(email, password).subscribe(() => {
                this.router.navigateByUrl('/home');
            });
        }
        else  {
            const {firstName, lastName} = this.form?.value;
            if (!firstName || !lastName) return;

            const newUser : User = {firstName, lastName, email, password};

            return this.loginService.register(newUser).subscribe(() => {
                this.toggleText();
            })

        }
    }

    toggleText() {
        if (this.submissionType === 'login') {
            this.submissionType = 'join';
        }
        else if (this.submissionType === 'join') {
            this.submissionType = 'login';
        }
    }
}