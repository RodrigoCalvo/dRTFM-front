import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from '../core/header/header.component';
import { mockInitialState } from '../testing-mocks/mocks';
import { FavouritesMenuComponent } from './favourites-menu/favourites-menu.component';

import { FavouritesComponent } from './favourites.component';

describe('FavouritesComponent', () => {
  let component: FavouritesComponent;
  let fixture: ComponentFixture<FavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FavouritesComponent,
        HeaderComponent,
        FavouritesMenuComponent,
      ],
      providers: [provideMockStore({ initialState: mockInitialState })],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
