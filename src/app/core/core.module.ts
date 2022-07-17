import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [LogoComponent, HeaderComponent, ConfirmDialogComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, LogoComponent, ConfirmDialogComponent],
})
export class CoreModule {}
