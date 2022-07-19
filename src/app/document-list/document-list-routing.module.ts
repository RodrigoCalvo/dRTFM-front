import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './document-list.component';
import { MydocsListComponent } from './mydocs-list/mydocs-list.component';
import { MyfavsListComponent } from './myfavs-list/myfavs-list.component';

const routes: Routes = [
  { path: '', component: DocumentListComponent },
  { path: 'docs', component: MydocsListComponent },
  { path: 'favs', component: MyfavsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentListRoutingModule {}
