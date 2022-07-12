import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../services/local.storage.service';
import { UsersApiService } from '../services/users.api.service';
import { AppState } from '../state/app.state';
import { loadCurrentUser } from '../state/currentUser.reducer/currentUser.action.creators';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <app-logo [size]="72"></app-logo>
      <div *ngIf="!viewRegister; else register">
        <app-login-form> </app-login-form>
        <p><span class="link" (click)="toggleRegister()">Registrarse</span></p>
      </div>
      <ng-template #register>
        <app-register-form> </app-register-form>
        <p><span class="link" (click)="toggleRegister()">Volver</span></p>
      </ng-template>
      <p><a routerLink="/home">Continuar sin registro</a></p>
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
      .link {
        cursor: pointer;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  viewRegister!: boolean;
  constructor(
    public userApi: UsersApiService,
    public store: Store<AppState>,
    public router: Router,
    public localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const token = this.localStorage.getToken();
    if (token) {
      this.userApi.loginUser(undefined, token).subscribe({
        next: (data) => {
          if (data.token) {
            this.store.dispatch(
              loadCurrentUser({
                currentUser: data.user,
                token: data.token,
              })
            );
            this.localStorage.saveToken(data.token);
            this.router.navigate(['home']);
          }
        },
      });
    }

    this.viewRegister = false;
  }

  toggleRegister() {
    this.viewRegister = !this.viewRegister;
  }
}
