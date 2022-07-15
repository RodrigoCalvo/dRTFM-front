import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from '../core/header/header.component';
import { mockInitialState } from '../testing-mocks/mocks';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent, HeaderComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling component.goBackFake', () => {
    it('should update component.speed and currentClass if not on 7', () => {
      component.goBackFake();
      expect(component.speed).toBe(2);
      expect(component.currentClass).toBe('imgr2');
    });
    it('should update component.speed but not currentClass if is on 7', () => {
      component.currentClass = 'imgr7';
      fixture.detectChanges();

      component.goBackFake();
      expect(component.currentClass).toBe('imgr7');
    });
  });
});
