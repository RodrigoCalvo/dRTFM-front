import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    LogoComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
