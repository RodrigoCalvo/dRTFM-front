import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { mockInitialState } from 'src/app/testing-mocks/mocks';

import { FavouritesMenuComponent } from './favourites-menu.component';

describe('FavouritesMenuComponent', () => {
  let component: FavouritesMenuComponent;
  let fixture: ComponentFixture<FavouritesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouritesMenuComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouritesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('When calling component.toggleDocs', () => {
    it('should change component.openedMyDocs and set openedMyFavs to false', () => {
      component.toggleDocs();
      expect(component.openedMyDocs).toBeTrue();
      expect(component.openedMyFavs).toBeFalse();
    });
  });
  describe('When calling component.toggleFavs', () => {
    it('should change component.openedMyFavs and set openedMyDocs to false', () => {
      component.toggleFavs();
      expect(component.openedMyFavs).toBeTrue();
      expect(component.openedMyDocs).toBeFalse();
    });
  });
});
