import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import {user} from "../model/user";
import { Observable, take, tap,BehaviorSubject } from "rxjs";
import { Storage } from '@capacitor/storage';

import * as jwtDecode from 'jwt-decode';
import { UserResponse } from "../model/userResponse";
@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private user$ = new BehaviorSubject<user|null>(null);
    private url = 'https://flavorxplorer.onrender.com/api';

    constructor(private http : HttpClient, private router : Router) {}

    private httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };

    register(newUser : user) : Observable<user> {
        
        const user = {
            user : newUser
        }
        return this.http.post<user>(this.url + '/users',user,this.httpOptions).pipe(take(1));
    }

    login(identifier : string, password : string) : Observable<{token : string}> {
        return this.http.post<UserResponse>(
            this.url + '/login',
            {identifier, password},
            this.httpOptions
        )
        .pipe(
            take(1),
            tap((response : UserResponse) => {
                localStorage.setItem("token", response.token)
                localStorage.setItem("user_id", response.user_id.toString())
            })
        );
    }

    logout(): void {
        this.user$.next(null);
        localStorage.removeItem("token")
        this.router.navigateByUrl('');
      }
}