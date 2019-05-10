import { Injectable } from '@angular/core';

import { User } from 'src/app/user/user.model';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

// TODO: Add environment variable and change BACKEND_URL
const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user: User;
  private userUpdated = new Subject<{user: User; }>();

  constructor(private http: HttpClient, private router: Router) {}

  //  TODO: this will be admin feature
  getUsers() {}

  getUser(id: string) {
    return this.http.get<{
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phone: string;
    }>(BACKEND_URL + id);

  }

  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }

  addUser(firstName: string, lastName: string, phone: string) {
    const userData = new FormData();
    userData.append('firstName', firstName);
    userData.append('lastName', lastName);
    userData.append('phone', phone);
    this.http.post<{ message: string; user: User }>(BACKEND_URL, userData)
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });
  }
}
