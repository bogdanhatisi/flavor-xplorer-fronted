import { Component } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/app/environments';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-user-service',
  templateUrl: './user-service.component.html',
  styleUrls: ['./user-service.component.css'],
})
export class UserServiceComponent {
  baseUrl = environment.baseUrl;
  jwtToken = environment.jwtToken;

  setJwtToken(token: string): void {
    this.jwtToken = token;
  }

  async findOne(id: number): Promise<User> {
    // Ensure the jwtToken is set before making the request
    if (!this.jwtToken) {
      console.error(
        'JWT token not set. Please set the token before making requests.'
      );
      return Promise.reject('JWT token not set.');
    }

    // Set the Authorization header with the JWT token
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    };

    return axios
      .get<User>(`${this.baseUrl}/users/${id}/account`, config)
      .then((response: AxiosResponse<User>) => response.data)
      .catch((error) => Promise.reject(error));
  }

  async getFollowers(id: number): Promise<string> {
    // Ensure the jwtToken is set before making the request
    if (!this.jwtToken) {
      console.error(
        'JWT token not set. Please set the token before making requests.'
      );
      return Promise.reject('JWT token not set.');
    }

    // Set the Authorization header with the JWT token
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    };

    return axios
      .get<string>(`${this.baseUrl}/users/${id}/followers`, config)
      .then((response: AxiosResponse<string>) => response.data)
      .catch((error) => Promise.reject(error));
  }

  async getFollowing(id: number): Promise<string> {
    // Ensure the jwtToken is set before making the request
    if (!this.jwtToken) {
      console.error(
        'JWT token not set. Please set the token before making requests.'
      );
      return Promise.reject('JWT token not set.');
    }

    // Set the Authorization header with the JWT token
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    };

    return axios
      .get<string>(`${this.baseUrl}/users/${id}/following`, config)
      .then((response: AxiosResponse<string>) => response.data)
      .catch((error) => Promise.reject(error));
  }

  async followUser(followId: number): Promise<string> {
    if (!this.jwtToken) {
      console.error(
        'JWT token not set. Please set the token before making requests.'
      );
      return Promise.reject('JWT token not set.');
    }

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
        'Content-Type': 'application/json',
      },
    };

    return axios
      .post<string>(
        `${this.baseUrl}/relationships/follow`,
        {
          followed_id: followId,
        },
        config
      )
      .then((response: AxiosResponse<string>) => response.data)
      .catch((error) => Promise.reject(error));
  }
}
