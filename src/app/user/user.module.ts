import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CoreModule } from '../core/core.module';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserComponent, UserFormComponent],
  imports: [CommonModule, CoreModule, UserRoutingModule, FormsModule],
})
export class UserModule {}
