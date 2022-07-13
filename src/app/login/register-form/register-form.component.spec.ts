import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { iUser } from 'src/app/models/user.model';
import { mockInitialState } from 'src/app/testing-mocks/mocks';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling component.handleSubmit with present and correct registerData', () => {
    it('should call component store.dispatch, localStorage.saveToken and router.navigate', () => {
      component.registerData = {
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        rPassword: 'test',
      };
      spyOn(component.userApi, 'addUser').and.returnValue(
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
  describe('When calling component.handleSubmit with already used email in registerData', () => {
    it('should set component.errorMessage', () => {
      component.registerData = {
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        rPassword: 'test',
      };
      spyOn(component.userApi, 'addUser').and.returnValue(
        new Observable(() => {
          throw new Error();
        })
      );
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
    });
  });
  describe('When calling component.handleSubmit with diferent passwords in registerData', () => {
    it('should set component.errorMessage', () => {
      component.registerData = {
        name: 'test',
        email: 'test',
        password: 'test',
        rPassword: 'test2',
      };
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
    });
  });
  describe('When calling component.handleSubmit with incorrect email in registerData', () => {
    it('should set component.errorMessage', () => {
      component.registerData = {
        name: 'test',
        email: 'teeeest',
        password: 'test',
        rPassword: 'test',
      };
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
    });
  });
  describe('When calling component.handleSubmit with lower than 4char password in registerData', () => {
    it('should set component.errorMessage', () => {
      component.registerData = {
        name: 'test',
        email: 'test@test.com',
        password: 'te',
        rPassword: 'te',
      };
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
    });
  });
  describe('When calling component.handleSubmit with blank in any field of registerData', () => {
    it('should set component.errorMessage', () => {
      component.registerData = {
        name: '',
        email: 'test@test.com',
        password: 'test',
        rPassword: 'test',
      };
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
    });
  });
});
