import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { HeaderComponent } from '../core/header/header.component';
import { iUser } from '../models/user.model';
import { mockInitialState } from '../testing-mocks/mocks';
import { UserFormComponent } from './user-form/user-form.component';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [UserComponent, HeaderComponent, UserFormComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling component.deleteAccount', () => {
    it('should set component.showDeletePrompt to true', () => {
      component.deleteAccount();
      expect(component.showDeletePrompt).toBeTrue();
    });
  });

  describe('When calling component.handleDeletePrompt with true answer', () => {
    it('should call store.dispatch, localStorage.cleanToken and router.navigate', () => {
      spyOn(component.usersApi, 'deleteSelfUser').and.returnValue(
        of({ deleted: true })
      );
      component.currentUserData = { user: {} as iUser, token: 'token' };
      spyOn(component.store, 'dispatch');
      spyOn(component.localStorage, 'clearToken');
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      component.handleDeletePrompt(true);

      expect(component.store.dispatch).toHaveBeenCalled();
      expect(component.localStorage.clearToken).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
