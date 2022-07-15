import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { iUser } from 'src/app/models/user.model';
import { mockInitialState } from 'src/app/testing-mocks/mocks';

import { FavouritesMenuComponent } from './favourites-menu.component';

describe('FavouritesMenuComponent', () => {
  let component: FavouritesMenuComponent;
  let fixture: ComponentFixture<FavouritesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
      component.user = { _id: 'test' } as iUser;
      fixture.detectChanges();

      component.toggleDocs();
      expect(component.openedMyDocs).toBeTrue();
      expect(component.openedMyFavs).toBeFalse();
    });
  });
  describe('When calling component.toggleDocs with no user', () => {
    it('should change component.openedMyDocs and set openedMyFavs to false', () => {
      component.user = {} as iUser;
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      component.toggleDocs();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
  describe('When calling component.toggleFavs', () => {
    it('should change component.openedMyFavs and set openedMyDocs to false', () => {
      component.user = { _id: 'test' } as iUser;
      fixture.detectChanges();

      component.toggleFavs();
      expect(component.openedMyFavs).toBeTrue();
      expect(component.openedMyDocs).toBeFalse();
    });
  });
  describe('When calling component.toggleFavs with no user', () => {
    it('should change component.openedMyFavs and set openedMyDocs to false', () => {
      component.user = {} as iUser;
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      component.toggleFavs();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
