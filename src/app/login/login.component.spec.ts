import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { LogoComponent } from '../core/logo/logo.component';
import { iUser } from '../models/user.model';
import { mockInitialState } from '../testing-mocks/mocks';
import { LoginFormComponent } from './login-form/login-form.component';

import { LoginComponent } from './login.component';
import { RegisterFormComponent } from './register-form/register-form.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        LogoComponent,
        LoginFormComponent,
        RegisterFormComponent,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  describe('When loading the component', () => {
    it('should get the token from localStorage and try to loginWithToken', () => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      spyOn(component.localStorage, 'getToken').and.returnValue('token');
      spyOn(component.userApi, 'loginUser').and.returnValue(
        of({ user: {} as iUser, token: 'token' })
      );
      spyOn(component.store, 'dispatch');
      fixture.detectChanges();

      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });
  describe('When calling toggleRegister', () => {
    it('should change the value of boolean viewRegister', () => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      component.viewRegister = false;
      fixture.detectChanges();
      component.toggleRegister();
      expect(component.viewRegister).toBeTrue();
    });
  });
});
