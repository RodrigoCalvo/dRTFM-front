import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HeaderComponent } from '../core/header/header.component';
import { mockInitialState } from '../testing-mocks/mocks';

import { DetailComponent } from './detail.component';
import { DetailsComponent } from './details/details.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent, HeaderComponent, DetailsComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
