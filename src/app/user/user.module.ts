import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UserCreateComponent } from 'src/app/user/user-create/user-create.component';
import { UserInfoComponent } from 'src/app/user/user-Info/user-info.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from 'src/app/angular-materials.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserCreateComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule, // this adds common functionalities like ngIf
    ReactiveFormsModule,
    AngularMaterialsModule,
    RouterModule
      ]
})

export class UserModule {}
