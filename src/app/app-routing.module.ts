import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { PostListComponent } from './posts/post-list/post-list.component';
// import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { UserInfoComponent } from 'src/app/user/user-Info/user-info.component';
import { UserCreateComponent } from 'src/app/user/user-create/user-create.component';
import { FeedbackComponent } from 'src/app/feedback/feedback.component';
import { MealPlanComponent } from 'src/app/meal-plan/meal-plan.component';
import { AttemptComponent } from 'src/app/attempts/attempt.component';
import { FoodCreateComponent } from 'src/app/food/food-create/food-create.component';
import { FoodListComponent } from 'src/app/food/food-list/food-list.component';
import { HomeComponent } from 'src/app/home/home.component';
import { BodyFatListComponent } from './body-fat/body-fat-list/body-fat-list.component';
import { BodyFatCreateComponent } from './body-fat/body-fat-create/body-fat-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // if path is empty, defaults to main page
  // { path: 'create', component: SignupComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:userId',
    component: UserCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'daily-feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'meal-plan',
    component: MealPlanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'body-fat-list',
    component: BodyFatListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'body-fat-create',
    component: BodyFatCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'attempt',
    component: AttemptComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'food-list',
    component: FoodListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'food-create',
    component: FoodCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'food-edit/:foodId',
    component: FoodCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
