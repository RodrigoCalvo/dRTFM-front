import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [SearchComponent, SearchBarComponent, SearchResultsComponent],
  imports: [CommonModule, CoreModule, RouterModule, SearchRoutingModule],
})
export class SearchModule {}
