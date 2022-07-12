import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'src/app/services/local.storage.service';
import { UsersApiService } from 'src/app/services/users.api.service';
import { AppState } from 'src/app/state/app.state';
import { loadCurrentUser } from 'src/app/state/currentUser.reducer/currentUser.action.creators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginData!: { email: string; password: string };
  loginError!: boolean;
  constructor(
    private userApi: UsersApiService,
    private store: Store<AppState>,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loginData = { email: '', password: '' };
    this.loginError = false;
  }

  handleSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.userApi.loginUser(this.loginData).subscribe({
        next: (data) => {
          if (data.token) {
            this.store.dispatch(
              loadCurrentUser({ currentUser: data.user, token: data.token })
            );
            this.localStorage.saveToken(data.token);
            this.router.navigate(['home']);
          }
        },
        error: (err) => {
          this.loginError = true;
        },
      });
    }
  }
}
