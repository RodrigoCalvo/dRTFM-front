import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { FavouritesMenuComponent } from './favourites-menu/favourites-menu.component';
import { CoreModule } from '../core/core.module';
import { FavouritesRoutingModule } from './favourites-routing.module';

@NgModule({
  declarations: [FavouritesComponent, FavouritesMenuComponent],
  imports: [CommonModule, CoreModule, FavouritesRoutingModule],
})
export class FavouritesModule {}
