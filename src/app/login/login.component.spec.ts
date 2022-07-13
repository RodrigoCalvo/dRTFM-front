import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { LogoComponent } from '../core/logo/logo.component';
import { mockInitialState } from '../testing-mocks/mocks';
import { LoginFormComponent } from './login-form/login-form.component';

import { LoginComponent } from './login.component';
import { RegisterFormComponent } from './register-form/register-form.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        LogoComponent,
        LoginFormComponent,
        RegisterFormComponent,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
