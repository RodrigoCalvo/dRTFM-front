import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iCurrentUserState } from '../models/user.model';
import { LocalStorageService } from '../services/local.storage.service';
import { UsersApiService } from '../services/users.api.service';
import { AppState } from '../state/app.state';
import { clearCurrentUser } from '../state/currentUser.reducer/currentUser.action.creators';

@Component({
  selector: 'app-user',
  template: `
    <app-confirm-dialog
      *ngIf="showDeletePrompt"
      [question]="deletePrompt"
      (answer)="handleDeletePrompt($event)"
    ></app-confirm-dialog>
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
  currentUserData!: iCurrentUserState;
  showDeletePrompt!: boolean;
  deletePrompt: string =
    'Confirma que deseas eliminar definitivamente tu cuenta y todos los documentos asociados a ella';
  constructor(
    public store: Store<AppState>,
    public usersApi: UsersApiService,
    public localStorage: LocalStorageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.showDeletePrompt = false;
  }

  deleteAccount() {
    this.showDeletePrompt = true;
  }

  handleDeletePrompt(answer: boolean) {
    this.showDeletePrompt = false;
    if (answer) {
      this.usersApi.deleteSelfUser(this.currentUserData.token).subscribe({
        next: (data) => {
          this.store.dispatch(clearCurrentUser());
          this.localStorage.clearToken();
          this.router.navigate(['login']);
        },
      });
    }
  }
}
