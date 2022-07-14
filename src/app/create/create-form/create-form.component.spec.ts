import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { iDocument } from 'src/app/models/document.model';
import { iUser } from 'src/app/models/user.model';
import { mockInitialState } from 'src/app/testing-mocks/mocks';

import { CreateFormComponent } from './create-form.component';

describe('CreateFormComponent', () => {
  let component: CreateFormComponent;
  let fixture: ComponentFixture<CreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CreateFormComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling component.handleKeydown', () => {
    it('should inserte a tab in event.target.value', () => {
      const mockEvent = {
        preventDefault: () => {},
        key: 'Tab',
        target: {
          selectionStart: '',
          selectionEnd: '',
          value: '',
        } as unknown as HTMLFormElement,
      } as unknown as KeyboardEvent;
      component.handleKeydown(mockEvent);
      expect((mockEvent.target as HTMLFormElement)['value']).toBe('\t');
    });
  });
  describe('When calling component.handleSubmit with user & document title and content and the api.addDocument is success', () => {
    it('should call store.dispatch and router.navigate', () => {
      component.currentUserData = { user: {} as iUser, token: 'token' };
      component.documentData = {
        title: 'test',
        contentString: 'test',
        keywordsString: '',
      };
      spyOn(component.documentApi, 'addDocument').and.returnValue(
        of({} as iDocument)
      );
      spyOn(component.usersApi, 'loginUser').and.returnValue(
        of({ user: {} as iUser, token: '' })
      );
      spyOn(component.store, 'dispatch');
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.store.dispatch).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
  describe('When calling component.handleSubmit with no user', () => {
    it('should call store.dispatch, localStorage.clearToken and router.navigate', () => {
      component.currentUserData = {
        user: null,
        token: 'token',
      } as unknown as {
        user: iUser;
        token: string;
      };
      spyOn(component.store, 'dispatch');
      spyOn(component.router, 'navigate');
      spyOn(component.localStorage, 'clearToken');
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.store.dispatch).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
  describe('When calling component.handleSubmit with user but no document title or content', () => {
    it('should set component.errorMessage', () => {
      component.currentUserData = { user: {} as iUser, token: 'token' };
      component.documentData = {
        title: '',
        contentString: 'test',
        keywordsString: '',
      };
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
    });
  });
  describe('When calling component.handleSubmit with user & document title and content and the api.addDocument fails', () => {
    it('should set component.errorMessage and empty the documendData', () => {
      component.currentUserData = { user: {} as iUser, token: 'token' };
      component.documentData = {
        title: 'test',
        contentString: 'test',
        keywordsString: '',
      };
      spyOn(component.documentApi, 'addDocument').and.returnValue(
        new Observable(() => {
          throw new Error();
        })
      );
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.errorMessage).toBeTruthy();
      expect(component.documentData.title).toBeFalsy();
    });
  });
});
