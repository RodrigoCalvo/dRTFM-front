import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MainMenuComponent } from './main-menu/main-menu.component';



@NgModule({
  declarations: [
    HomeComponent,
    MainMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
