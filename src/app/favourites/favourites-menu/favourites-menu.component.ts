import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { iDocument } from 'src/app/models/document.model';
import { iDocumentWithoutAuthor, iUser } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-favourites-menu',
  templateUrl: './favourites-menu.component.html',
  styleUrls: ['./favourites-menu.component.scss'],
})
export class FavouritesMenuComponent implements OnInit {
  user!: iUser;
  openedMyDocs!: boolean;
  openedMyFavs!: boolean;
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.openedMyDocs = false;
    this.openedMyFavs = false;
    this.store
      .select((state) => state.currentUser)
      .subscribe({ next: (data) => (this.user = data.user) });
  }

  toggleDocs() {
    this.openedMyDocs = !this.openedMyDocs;
    this.openedMyFavs = false;
  }
  toggleFavs() {
    this.openedMyFavs = !this.openedMyFavs;
    this.openedMyDocs = false;
  }
}
