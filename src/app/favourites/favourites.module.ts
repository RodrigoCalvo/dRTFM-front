import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesComponent } from './favourites.component';
import { FavouritesMenuComponent } from './favourites-menu/favourites-menu.component';



@NgModule({
  declarations: [
    FavouritesComponent,
    FavouritesMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FavouritesModule { }
