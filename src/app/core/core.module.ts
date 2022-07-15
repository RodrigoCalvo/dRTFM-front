import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LogoComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, LogoComponent],
})
export class CoreModule {}
