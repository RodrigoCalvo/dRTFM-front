import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CoreModule } from '../core/core.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent, UserFormComponent],
  imports: [CommonModule, CoreModule, UserRoutingModule],
})
export class UserModule {}
