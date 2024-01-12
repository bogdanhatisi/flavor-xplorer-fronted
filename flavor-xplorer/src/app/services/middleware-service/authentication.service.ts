import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private backendApiUrl = "https://flavorxplorer.onrender.com/api"

  constructor(private http : HttpClient) { }

  getCurrentUserToken() : string | null {
    return localStorage.getItem('token') || null;
  }

  getAuthenticationHeader() : HttpHeaders {
    const token = JSON.parse(this.getCurrentUserToken() || "{}")
    return new HttpHeaders({Authorization : token ? `${token}` : ''})
  }

  // customHttp() : HttpClient {
  //   const headers = this.getAuthenticationHeader()
  //   return this.http.create()
  // }

}
