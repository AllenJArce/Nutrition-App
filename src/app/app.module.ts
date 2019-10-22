import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialsModule } from 'src/app/angular-materials.module';

import { AppComponent } from './app.component';
// import { UserInfoComponent } from 'src/app/user/user-Info/user-info.component';
// import { UserCreateComponent } from 'src/app/user/user-create/user-create.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { UserService } from 'src/app/user/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/auth/auth-interceptor';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserModule } from 'src/app/user/user.module';
import { FeedbackComponent } from 'src/app/feedback/feedback.component';
import { MealPlanComponent } from 'src/app/meal-plan/meal-plan.component';
import { AttemptComponent } from 'src/app/attempts/attempt.component';
import { FoodCreateComponent } from 'src/app/food/food-create/food-create.component';
import { FoodListComponent } from 'src/app/food/food-list/food-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/home/home.component';
import { BodyFatListComponent } from './body-fat/body-fat-list/body-fat-list.component';
import { BodyFatCreateComponent } from './body-fat/body-fat-create/body-fat-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AttemptComponent,
    FeedbackComponent,
    MealPlanComponent,
    FoodCreateComponent,
    BodyFatListComponent,
    BodyFatCreateComponent,
    FoodListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialsModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
    RouterModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
