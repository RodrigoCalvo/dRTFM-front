import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iCurrentUserState, iUser } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/local.storage.service';
import { UsersApiService } from 'src/app/services/users.api.service';
import { AppState } from 'src/app/state/app.state';
import {
  clearCurrentUser,
  loadCurrentUser,
} from 'src/app/state/currentUser.reducer/currentUser.action.creators';
import { isEmail } from '../../helpers/isEmail';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  currentUserData!: iCurrentUserState;
  formData!: {
    name: string;
    email: string;
    password: string;
    rPassword: string;
  };
  editable!: boolean;
  errorMessage!: string;
  constructor(
    public store: Store<AppState>,
    public userApi: UsersApiService,
    public localStorage: LocalStorageService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.currentUser)
      .subscribe({
        next: (data) => (this.currentUserData = data),
      });
    this.editable = false;
    this.formData = {
      name: this.currentUserData.user.name,
      email: this.currentUserData.user.email,
      password: '',
      rPassword: '',
    };
    this.errorMessage = '';
  }

  handleSubmit() {
    if (isEmail(this.formData.email)) {
      if (this.formData.password === this.formData.rPassword) {
        if (
          this.formData.name === this.currentUserData.user.name &&
          this.formData.email === this.currentUserData.user.email &&
          !this.formData.password
        ) {
          // no changes
          this.editable = false;
        } else {
          const updateUser: Partial<iUser> = {
            name: this.formData.name
              ? this.formData.name
              : this.currentUserData.user.name,
            email: this.formData.email
              ? this.formData.email
              : this.currentUserData.user.email,
          };
          if (this.formData.password)
            updateUser.password = this.formData.password;
          this.userApi
            .updateUser(updateUser, this.currentUserData.token)
            .subscribe({
              next: (data) => {
                if (data._id) {
                  this.store.dispatch(
                    loadCurrentUser({
                      currentUser: data,
                      token: this.currentUserData.token,
                    })
                  );
                  this.editable = false;
                  this.currentUserData.user = data;
                }
              },
              error: (err) => {
                this.errorMessage = 'Error al actualizar el usuario.';
              },
            });
        }
      } else {
        this.errorMessage = 'Las contraseñas no coinciden.';
      }
    } else {
      this.errorMessage = 'El email es incorrecto.';
    }
  }

  toggleEditable() {
    this.editable = !this.editable;
  }

  handleCancel() {
    this.toggleEditable();
    this.formData = {
      name: this.currentUserData.user.name,
      email: this.currentUserData.user.email,
      password: '',
      rPassword: '',
    };
  }

  logout() {
    this.localStorage.clearToken();
    this.store.dispatch(clearCurrentUser());
    this.router.navigate(['login']);
  }
}
