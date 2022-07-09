import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesMenuComponent } from './favourites-menu.component';

describe('FavouritesMenuComponent', () => {
  let component: FavouritesMenuComponent;
  let fixture: ComponentFixture<FavouritesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
