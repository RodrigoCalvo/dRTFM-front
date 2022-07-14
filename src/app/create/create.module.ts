import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateComponent, CreateFormComponent],
  imports: [CommonModule, CreateRoutingModule, CoreModule, FormsModule],
})
export class CreateModule {}
