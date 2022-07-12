import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UsersApiService } from 'src/app/services/users.api.service';
import { loadCurrentUser } from 'src/app/state/currentUser.reducer/currentUser.action.creators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginData!: { email: string; password: string };
  constructor(private userApi: UsersApiService, private store: Store) {}

  ngOnInit(): void {
    this.loginData = { email: '', password: '' };
  }

  handleSubmit() {
    if (this.loginData.email && this.loginData.password) {
      try {
        this.userApi
          .loginUser(this.loginData.email, this.loginData.password)
          .subscribe({
            next: (data) => {
              if (data.token) {
                this.store.dispatch(
                  loadCurrentUser({ currentUser: data.user, token: data.token })
                );
                console.log(data);
              }
            },
          });
      } catch (e) {}
    }
  }
}
