import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { iDocument } from 'src/app/models/document.model';
import { iUser } from 'src/app/models/user.model';
import { mockInitialState } from 'src/app/testing-mocks/mocks';

import { SearchResultsComponent } from './search-results.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling component.checkIfItIs with type fav', () => {
    it('should return false', () => {
      component.currentUserData = {
        user: {
          name: '',
          email: '',
          password: '',
          photo: '',
          myFavs: [{ _id: 'test' }] as Array<iDocument>,
          myDocuments: [{ _id: 'test' }] as Array<iDocument>,
        } as iUser,
        token: 'token',
      };
      fixture.detectChanges();

      const result = component.checkIfItIs('fav', 'test');

      expect(result).toBeTrue();
    });
  });
  describe('When calling component.checkIfItIs with type mine', () => {
    it('should return false', () => {
      component.currentUserData = {
        user: {
          name: '',
          email: '',
          password: '',
          photo: '',
          myFavs: [{ _id: 'test' }] as Array<iDocument>,
          myDocuments: [{ _id: 'test' }] as Array<iDocument>,
        } as iUser,
        token: 'token',
      };
      fixture.detectChanges();

      const result = component.checkIfItIs('mine', 'test');

      expect(result).toBeTrue();
    });
  });
  describe('When calling component.checkIfItIs with type fork', () => {
    it('should return false', () => {
      component.currentUserData = {
        user: {
          name: '',
          email: '',
          password: '',
          photo: '',
          myFavs: [{ _id: 'test' }] as Array<iDocument>,
          myDocuments: [{ fork: 'test' }] as Array<iDocument>,
        } as iUser,
        token: 'token',
      };
      fixture.detectChanges();

      const result = component.checkIfItIs('fork', 'test');

      expect(result).toBeTrue();
    });
  });
  describe('When calling component.checkIfItIs without type', () => {
    it('should return false', () => {
      component.currentUserData = {
        user: {} as iUser,
        token: 'token',
      };
      fixture.detectChanges();

      const result = component.checkIfItIs('', 'test');

      expect(result).toBeFalse();
    });
  });
});
