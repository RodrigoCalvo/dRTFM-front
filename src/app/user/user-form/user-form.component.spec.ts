import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockInitialState } from 'src/app/testing-mocks/mocks';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
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
