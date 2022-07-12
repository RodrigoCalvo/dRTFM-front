import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { iUser } from './models/user.model';
import { LocalStorageService } from './services/local.storage.service';
import { AppState } from './state/app.state';
import { loadCurrentUser } from './state/currentUser.reducer/currentUser.action.creators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'drtfm';
  constructor(
    private localStorage: LocalStorageService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    let token = this.localStorage.getToken();
    if (token)
      this.store.dispatch(loadCurrentUser({ currentUser: {} as iUser, token }));
  }
}
