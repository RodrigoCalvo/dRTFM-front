import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  template: ` <app-header></app-header>
    <app-favourites-menu></app-favourites-menu>`,
  styles: [],
})
export class FavouritesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
