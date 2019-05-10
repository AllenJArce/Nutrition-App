import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';
import { AngularMaterialsModule } from 'src/app/angular-materials.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, AngularMaterialsModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}
