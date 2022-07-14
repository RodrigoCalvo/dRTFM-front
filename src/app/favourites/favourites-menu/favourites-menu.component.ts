import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iUser } from 'src/app/models/user.model';
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
  constructor(public store: Store<AppState>, public router: Router) {}

  ngOnInit(): void {
    this.openedMyDocs = false;
    this.openedMyFavs = false;
    this.store
      .select((state) => state.currentUser)
      .subscribe({ next: (data) => (this.user = data.user) });
  }

  toggleDocs() {
    if (!this.user._id) {
      this.router.navigate(['login']);
    } else {
      this.openedMyDocs = !this.openedMyDocs;
      this.openedMyFavs = false;
    }
  }
  toggleFavs() {
    if (!this.user._id) {
      this.router.navigate(['login']);
    } else {
      this.openedMyFavs = !this.openedMyFavs;
      this.openedMyDocs = false;
    }
  }
}
