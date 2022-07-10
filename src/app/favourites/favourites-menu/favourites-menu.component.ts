import { Component, OnInit } from '@angular/core';
import { iUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-favourites-menu',
  templateUrl: './favourites-menu.component.html',
  styleUrls: ['./favourites-menu.component.scss'],
})
export class FavouritesMenuComponent implements OnInit {
  user!: iUser;
  constructor() {}

  ngOnInit(): void {}
}
