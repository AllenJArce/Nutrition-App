import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  currentUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  };
  userIsAuthenticated = false;
  user: User;

  private authStatusSub: Subscription;
  private userSub: Subscription;

  isLoading = false;
  userId: string;
  form: FormGroup;

  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    console.log('userID: ' + this.userId);
    this.userService.getUser(this.userId)
    // this.userSub = this.userService
    //   .getUserUpdateListener()
      .subscribe(userData => {
        this.isLoading = false;
        this.user = {
          id: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          phone: userData.phone
        };
        // this.currentUser = {
        //   id: userData._id,
        //   firstName: userData.firstName,
        //   lastName: userData.lastName,
        //   email: userData.email,
        //   password: userData.password,
        //   phone: userData.phone
        // };
      });
      // .subscribe((userData: { user: User }) => {
      //   this.isLoading = false;
      //   this.currentUser.firstName = userData.user.firstName;
      //   this.currentUser.lastName = userData.user.lastName;
      //   this.currentUser.email = userData.user.email;
      //   this.currentUser.email = userData.user.phone;
      //   console.log('user Name: ' +  this.currentUser.firstName);
      // });
      // console.log('user Name: ' +  this.currentUser.firstName);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });

    // this.isLoading = true;
    // this.userId = this.authService.getUserId();
    // console.log('userId ' + this.userId);
    // this.authStatusSub = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(authStatus => {
    //     this.isLoading = false;
    //   });
    // this.form = new FormGroup({
    //   firstName: new FormControl(null, {
    //     validators: [Validators.required, Validators.minLength(3)]
    //   }),
    //   lastName: new FormControl(null, { validators: [Validators.required] }),
    //   phone: new FormControl(null, {
    //     validators: [Validators.required]
    //   })
    // });
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('userId')) {
    //     this.userId = paramMap.get('userId');
    //     this.isLoading = true;
    //     this.userService.getUser(this.userId).subscribe(userData => {
    //       this.isLoading = false;
    //       console.log('user is ' + this.user);
    //       this.user = {
    //         id: userData._id,
    //         firstName: userData.firstName,
    //         lastName: userData.lastName,
    //         email: userData.email,
    //         password: userData.password,
    //         phone: userData.phone
    //       };
    //       this.form.setValue({
    //         firstName: this.user.firstName,
    //         lastName: this.user.lastName,
    //         email: this.user.email,
    //         password: this.user.password,
    //         phone: this.user.phone
    //       });
    //       // TODO: add edit here
    //     });
    //   }
    // });

    // this.user = this.userService.getUser();
  }
  /* TODO: This will be later added to its own component, HealthInfoComponent
  healthInfo = {
    height: '',
    weight: '',
    DOB: '',
    bodyFat: ''
  };
*/

  editUserInfo() {
    // this.userInfo.firstName = 'Bali';
    // this.userInfo.lastName = 'Song';
    // this.userInfo.email = 'Bali@bali.com';
    // this.userInfo.password = 'BaliChicken';
    // this.userInfo.phone = '786-786-7861';
  }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }
}
