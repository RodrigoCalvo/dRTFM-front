import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';



@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
