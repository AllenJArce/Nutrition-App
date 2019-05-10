import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {
  enteredFirstName: '';
  enteredLastName: '';
  enteredEmail: '';
  enteredPassword: '';
  enteredPhone: '';
  isLoading = false;
  user: User;
  form: FormGroup;
  private mode = 'create';
  private userId: string;
  private authStatusSub: Subscription;

  newHealthInfo = {
    height: '',
    weight: '',
    bodyFat: ''
  };

  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      lastName: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.isLoading = true;
        this.userService.getUser(this.userId).subscribe(userData => {
          this.isLoading = false;
          this.user = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            phone: userData.phone
          };
          this.form.setValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            phone: this.user.phone
          });
        });
      } else {
        this.mode = 'create';
        this.userId = null;
      }
    });
  }

  saveUserInfo() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.userService.addUser(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.phone
      );
    }
    this.form.reset();
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
