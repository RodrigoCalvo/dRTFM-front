import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    DetailComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DetailModule { }
