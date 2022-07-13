import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { iUser } from 'src/app/models/user.model';
import { mockInitialState } from 'src/app/testing-mocks/mocks';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('When calling component.handleSubmit with present and correct loginData', () => {
    it('should call component store.dispatch, localStorage.saveToken and router.navigate', () => {
      component.loginData = { email: 'test', password: 'test' };
      spyOn(component.userApi, 'loginUser').and.returnValue(
        of({ user: {} as iUser, token: 'token' })
      );
      spyOn(component.store, 'dispatch');
      spyOn(component.localStorage, 'saveToken');
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.store.dispatch).toHaveBeenCalled();
      expect(component.localStorage.saveToken).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
  describe('When calling component.handleSubmit with present and incorrect loginData', () => {
    it('should change component.loginError to true and clean the loginData', () => {
      component.loginData = { email: 'test', password: 'test' };
      spyOn(component.userApi, 'loginUser').and.returnValue(
        new Observable(() => {
          throw new Error();
        })
      );
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.loginError).toBeTrue();
      expect(component.loginData).toEqual({ email: '', password: '' });
    });
  });
});
