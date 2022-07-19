import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentListRoutingModule } from './document-list-routing.module';
import { MyfavsListComponent } from './myfavs-list/myfavs-list.component';
import { MydocsListComponent } from './mydocs-list/mydocs-list.component';
import { DocumentListComponent } from './document-list.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyfavsListComponent,
    MydocsListComponent,
    DocumentListComponent,
  ],
  imports: [
    CommonModule,
    DocumentListRoutingModule,
    CoreModule,
    ReactiveFormsModule,
  ],
})
export class DocumentListModule {}
