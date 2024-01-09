import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { User } from "../model/user";
import { Observable, take, tap,BehaviorSubject } from "rxjs";
import { Storage } from '@capacitor/storage';

import * as jwtDecode from 'jwt-decode';
import { UserResponse } from "../model/userResponse";
@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private user$ = new BehaviorSubject<User|null>(null);
    private url = 'https://flavorxplorer.onrender.com/api';

    constructor(private http : HttpClient, private router : Router) {}

    private httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };

    register(newUser : User) : Observable<User> {
        return this.http.post<User>(this.url + '/users',newUser,this.httpOptions).pipe(take(1));
    }

    login(email : string, password : string) : Observable<{token : string}> {
        return this.http.post<{token : string}>(
            this.url + '/login',
            {email, password},
            this.httpOptions
        )
        .pipe(
            take(1),
            tap((response : {token : string}) => {
                localStorage.setItem("token", response.token)
                const decodedToken : UserResponse = jwtDecode.jwtDecode(response.token);
                this.user$.next(decodedToken.user);
            })
        );
    }

    logout(): void {
        this.user$.next(null);
        Storage.remove({ key: 'token' });
  //      this.router.navigateByUrl('/auth');
      }
}