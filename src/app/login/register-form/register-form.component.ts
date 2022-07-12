import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iUser } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local.storage.service';
import { UsersApiService } from 'src/app/services/users.api.service';
import { AppState } from 'src/app/state/app.state';
import { loadCurrentUser } from 'src/app/state/currentUser.reducer/currentUser.action.creators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerData!: {
    name: string;
    email: string;
    password: string;
    rPassword: string;
  };
  passwordError!: boolean;
  emailError!: boolean;
  constructor(
    private userApi: UsersApiService,
    private store: Store<AppState>,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.registerData = {
      name: '',
      email: '',
      password: '',
      rPassword: '',
    };
    this.passwordError = false;
    this.emailError = false;
  }

  handleSubmit() {
    if (
      this.registerData.name &&
      this.registerData.email &&
      this.registerData.password &&
      this.registerData.rPassword
    ) {
      if (this.registerData.password === this.registerData.rPassword) {
        this.passwordError = false;
        const newUser: iUser = {
          name: this.registerData.name,
          email: this.registerData.email,
          password: this.registerData.password,
          photo: '',
          myDocuments: [],
          myFavs: [],
        };
        this.userApi.addUser(newUser).subscribe({
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
            this.emailError = true;
            this.registerData.email = '';
          },
        });
      } else {
        this.passwordError = true;
      }
    }
  }
}
