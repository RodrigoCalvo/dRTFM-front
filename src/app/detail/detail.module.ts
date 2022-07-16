import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { DetailsComponent } from './details/details.component';
import { CoreModule } from '../core/core.module';
import { DetailRoutingModule } from './detail-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailComponent, DetailsComponent],
  imports: [CommonModule, CoreModule, DetailRoutingModule, FormsModule],
})
export class DetailModule {}
