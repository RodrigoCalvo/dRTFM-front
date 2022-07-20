import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from './services/local.storage.service';
import { UsersApiService } from './services/users.api.service';
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
    public localStorage: LocalStorageService,
    public store: Store<AppState>,
    public usersApi: UsersApiService
  ) {}
  ngOnInit(): void {
    let token = this.localStorage.getToken();
    if (token) {
      this.usersApi.loginUser(undefined, token).subscribe({
        next: (data) =>
          this.store.dispatch(
            loadCurrentUser({ currentUser: data.user, token: data.token })
          ),
        error: (err) => {
          this.localStorage.clearToken();
        },
      });
    }
  }
}
