import { Component, OnInit } from '@angular/core';
import { iDocument } from 'src/app/models/document.model';
import { iDocumentWithoutAuthor, iUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-favourites-menu',
  templateUrl: './favourites-menu.component.html',
  styleUrls: ['./favourites-menu.component.scss'],
})
export class FavouritesMenuComponent implements OnInit {
  user: iUser = {
    myDocuments: [] as Array<iDocumentWithoutAuthor>,
    myFavs: [] as Array<iDocument>,
  } as iUser; //data demo
  constructor() {}

  ngOnInit(): void {}
}
