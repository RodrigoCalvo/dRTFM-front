import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { CreateFormComponent } from './create-form/create-form.component';


@NgModule({
  declarations: [
    CreateComponent,
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule
  ]
})
export class CreateModule { }
