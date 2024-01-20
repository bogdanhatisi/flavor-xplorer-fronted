import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/app/environments';
import { FollowerResponse } from 'src/app/models/followerResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UserServiceComponent {
  baseUrl = environment.baseUrl;
  jwtToken = localStorage.getItem('token');

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

  async getFollowers(id: number): Promise<FollowerResponse[]> {
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
      .get<FollowerResponse[]>(`${this.baseUrl}/users/${id}/followers`, config)
      .then((response: AxiosResponse<FollowerResponse[]>) => response.data)
      .catch((error) => Promise.reject(error));
  }

  async getFollowing(id: number): Promise<FollowerResponse[]> {
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
      .get<FollowerResponse[]>(`${this.baseUrl}/users/${id}/following`, config)
      .then((response: AxiosResponse<FollowerResponse[]>) => response.data)
      .catch((error) => Promise.reject(error));
  }

  async followOrUnfollowUser(followId: number, type: string): Promise<string> {
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
        `${this.baseUrl}/relationships/${type}`,
        {
          followed_id: followId,
        },
        config
      )
      .then((response: AxiosResponse<string>) => response.data)
      .catch((error) => Promise.reject(error));
  }

  async updateUserProfile(user: User): Promise<string> {
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
      .put<string>(`${this.baseUrl}/users/${user.id}/account`, user, config)
      .then((response: AxiosResponse<string>) => response.data)
      .catch((error) => Promise.reject(error));
  }

  async uploadAvatar(file: File): Promise<string> {
    if (!this.jwtToken) {
      console.error(
        'JWT token not set. Please set the token before making requests.'
      );
      return Promise.reject('JWT token not set.');
    }

    const formData = new FormData();
    formData.append('avatar', file);

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    return axios
      .post<string>(`${this.baseUrl}/upload/avatar`, formData, config)
      .then((response: AxiosResponse<string>) => response.data)
      .catch((error) => Promise.reject(error));
  }
}
