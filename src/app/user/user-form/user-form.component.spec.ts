import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { iUser } from '../../models/user.model';
import { mockInitialState } from '../../testing-mocks/mocks';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [UserFormComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`When calling component.handleSubmit with
            a valid formData.email
            equal and existent formData.password and rPassword
            successful updateUser api call`, () => {
    it('should call store.dispatch', () => {
      component.currentUserData.user = {
        name: '',
        email: '',
        password: '',
      } as iUser;
      component.formData = {
        name: '',
        email: 'test@test.com',
        password: 'test',
        rPassword: 'test',
      };
      spyOn(component.userApi, 'updateUser').and.returnValue(
        of({ _id: 'test' } as iUser)
      );
      spyOn(component.store, 'dispatch');
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });

  describe(`When calling component.handleSubmit with
            a valid formData.email
            equal and existent formData.password and rPassword
            successful updateUser api call`, () => {
    it('should call store.dispatch', () => {
      component.currentUserData.user = {
        name: 'test',
        email: 'test@test.com',
        password: '',
      } as iUser;
      component.formData = {
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        rPassword: 'test',
      };
      spyOn(component.userApi, 'updateUser').and.returnValue(
        of({ _id: 'test' } as iUser)
      );
      spyOn(component.store, 'dispatch');
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });

  describe(`When calling component.handleSubmit with
            a non valid formData.email`, () => {
    it('should set component.errorMessage', () => {
      component.formData = {
        name: 'test',
        email: 'testtest.com',
        password: 'test',
        rPassword: 'test',
      };
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
    });
  });

  describe(`When calling component.handleSubmit with
            a valid formData.email
            non equal formData.password and rPassword`, () => {
    it('should set component.errorMessage', () => {
      component.formData = {
        name: 'test',
        email: 'test@test.com',
        password: 'test1',
        rPassword: 'test',
      };
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
    });
  });

  describe(`When calling component.handleSubmit with
            a valid formData.email
            equal and existent formData.password and rPassword
            but none of them changes original currentUserData values`, () => {
    it('should set compoment.editable to false', () => {
      component.currentUserData.user = {
        name: 'test',
        email: 'test@test.com',
        password: 'test',
      } as iUser;
      component.formData = {
        name: 'test',
        email: 'test@test.com',
        password: '',
        rPassword: '',
      };
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.editable).toBeFalse();
    });
  });

  describe(`When calling component.handleSubmit with
            a valid formData.email
            equal and existent formData.password and rPassword
            but unsuccessful updateUser api call`, () => {
    it('should set component.errorMessage', () => {
      component.currentUserData.user = {
        name: 'test',
        email: 'test@test.com',
        password: '',
      } as iUser;
      component.formData = {
        name: 'test',
        email: 'test@test.com',
        password: 'test',
        rPassword: 'test',
      };
      spyOn(component.userApi, 'updateUser').and.returnValue(
        new Observable(() => {
          throw new Error();
        })
      );

      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
    });
  });

  describe('When calling component.handleCancel', () => {
    it('should toggle component.editable and clean formData.password field', () => {
      component.editable = true;
      component.formData.password = 'test';
      fixture.detectChanges();

      component.handleCancel();

      expect(component.editable).toBeFalse();
      expect(component.formData.password).toBe('');
    });
  });
  describe('When calling component.logout', () => {
    it('should call localStorage.clearToken, store.dispatch, router.navigate', () => {
      spyOn(component.localStorage, 'clearToken');
      spyOn(component.store, 'dispatch');
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      component.logout();

      expect(component.localStorage.clearToken).toHaveBeenCalled();
      expect(component.store.dispatch).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
