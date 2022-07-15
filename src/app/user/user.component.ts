import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../services/local.storage.service';
import { UsersApiService } from '../services/users.api.service';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-user',
  template: `
    <div>
      <app-header></app-header>
      <app-user-form></app-user-form>
      <p (click)="deleteAccount()">borrar cuenta</p>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        width: 60vw;
      }
      p {
        color: red;
        text-transform: uppercase;
        font-size: 0.8rem;
        margin: 1rem;
        cursor: pointer;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  constructor(
    public store: Store<AppState>,
    public usersApi: UsersApiService,
    public localStorage: LocalStorageService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  deleteAccount() {}
}
