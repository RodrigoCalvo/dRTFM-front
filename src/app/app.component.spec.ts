import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing'; //manual import
import { mockInitialState } from './testing-mocks/mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { iUser } from './models/user.model';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'drtfm'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('drtfm');
  });

  describe('When app is loaded with token in localStorage', () => {
    it('should use store.dispatch to load the data', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app.localStorage, 'getToken').and.returnValue('token');
      spyOn(app.usersApi, 'loginUser').and.returnValue(
        of({ user: {} as iUser, token: '' })
      );
      spyOn(app.store, 'dispatch');
      fixture.detectChanges();

      expect(app.store.dispatch).toHaveBeenCalled();
    });
  });
  describe('When app is loaded with invalid token in localStorage', () => {
    it('should uselocalStorage.clearToken to delete the saved token', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app.localStorage, 'getToken').and.returnValue('token');
      spyOn(app.usersApi, 'loginUser').and.returnValue(
        new Observable(() => {
          throw new Error();
        })
      );

      spyOn(app.localStorage, 'clearToken');
      fixture.detectChanges();

      expect(app.localStorage.clearToken).toHaveBeenCalled();
    });
  });
  describe('When app is loaded without token in localStorage', () => {
    it('shouldnt use store.dispatch', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app.localStorage, 'getToken').and.returnValue('');
      spyOn(app.store, 'dispatch');
      fixture.detectChanges();

      expect(app.store.dispatch).not.toHaveBeenCalled();
    });
  });
});
