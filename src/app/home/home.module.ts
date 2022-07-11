import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent, MainMenuComponent],
  imports: [CommonModule, CoreModule, HomeRoutingModule],
})
export class HomeModule {}
