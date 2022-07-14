import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iUser } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local.storage.service';
import { AppState } from 'src/app/state/app.state';
import { clearCurrentUser } from 'src/app/state/currentUser.reducer/currentUser.action.creators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  currentUser: iUser = { name: 'test', email: 'tes@test.com' } as iUser; //data demo
  constructor(
    public store: Store<AppState>,
    public localStorage: LocalStorageService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.localStorage.clearToken();
    this.store.dispatch(clearCurrentUser());
    this.router.navigate(['login']);
  }
}
