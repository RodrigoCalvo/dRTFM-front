import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { iDocument } from '../../models/document.model';
import { iCurrentUserState, iUser } from '../../models/user.model';
import { mockInitialState } from '../../testing-mocks/mocks';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        provideMockStore({ initialState: mockInitialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 'test',
              }),
            },
          },
        },
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('When component is loaded', () => {
  //   it('should ', () => {
  //     component.documentId = 'test';
  //     spyOn(component.store, 'select').and.returnValue(
  //       of({
  //         documents: [{ _id: 'test' }, { _id: 'tset' }],
  //         user: { _id: 'test' },
  //       })
  //     );
  //     spyOn(component, 'prepareForm');
  //     fixture.detectChanges();

  //     expect(component.currentUserData).not.toBeUndefined();
  //   });
  // });

  describe('When calling component.enableEdit', () => {
    it('should set component.editEnable to true', () => {
      component.enableEdit();

      expect(component.editEnable).toBeTrue();
    });
  });

  describe('When calling component.handleCancel', () => {
    it('should set component.editEnable to false and call component.prepareForm', () => {
      spyOn(component, 'prepareForm');
      fixture.detectChanges();

      component.handleCancel();

      expect(component.editEnable).toBeFalse();
      expect(component.prepareForm).toHaveBeenCalled();
    });
  });

  describe('When calling component.handleForm', () => {
    it('should set component.showForkPrompt to true', () => {
      component.handleFork();

      expect(component.showForkPrompt).toBeTrue();
    });
  });

  describe('When calling component.handleForkPrompt', () => {
    it('should call component.router.navigate', () => {
      component.document = { _id: '' } as iDocument;
      component.currentUserData = { user: {} as iUser, token: 'token' };
      spyOn(component.documentApi, 'forkDocument').and.returnValue(
        of({ _id: '' } as iDocument)
      );
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      component.handleForkPrompt(true);

      expect(component.router.navigate).toHaveBeenCalled();
    });
  });

  describe('When calling component.handleFavourite with a false in isFavourite', () => {
    it('should call store.dispatch', () => {
      spyOn(component, 'isFavourite').and.returnValue(false);
      spyOn(component.documentApi, 'addFavourite').and.returnValue(
        of({} as iDocument)
      );
      component.document = { _id: 'test' } as iDocument;
      component.currentUserData = {
        user: { myFavs: [{} as iDocument] },
        token: 'token',
      } as iCurrentUserState;
      spyOn(component.store, 'dispatch');
      fixture.detectChanges();

      component.handleFavourite();

      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });

  describe('When calling component.handleFavourite with a true in isFavourite', () => {
    it('should ', () => {
      spyOn(component, 'isFavourite').and.returnValue(true);
      component.document = { _id: 'test' } as iDocument;
      component.currentUserData = {
        user: {
          myFavs: [{ _id: 'test' } as iDocument, { _id: 'tset' } as iDocument],
        },
        token: 'token',
      } as iCurrentUserState;
      spyOn(component.usersApi, 'updateUser').and.returnValue(of({} as iUser));
      spyOn(component.store, 'dispatch');
      fixture.detectChanges();

      component.handleFavourite();

      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });

  describe('When calling component.isFavourite', () => {
    it('should return true if the document its on myFavs array', () => {
      component.currentUserData = {
        user: { myFavs: [{ _id: 'test' }] },
      } as iCurrentUserState;
      component.document = { _id: 'test' } as iDocument;
      fixture.detectChanges();

      const result = component.isFavourite();

      expect(result).toBeTrue();
    });
  });

  describe('When calling component.handleSubmit', () => {
    it('should call store.dispatch twice', () => {
      const mockDocument: iDocument = {
        title: '',
        author: { _id: '', name: '' },
        content: [{ text: '', options: [{ key: '', value: '' }] }],
        keywords: ['', ''],
        visibility: 'public',
      };
      const mockUserData: iCurrentUserState = {
        user: {} as iUser,
        token: 'token',
      };
      component.documentData = {
        title: 'test',
        contentString: 'test',
        keywordsString: 'test',
      };
      component.document = mockDocument;
      component.currentUserData = mockUserData;

      spyOn(component.documentApi, 'updateDocument').and.returnValue(
        of(mockDocument)
      );
      spyOn(component.store, 'dispatch');
      spyOn(component.usersApi, 'loginUser').and.returnValue(of(mockUserData));
      fixture.detectChanges();

      component.handleSubmit();

      expect(component.store.dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe('When calling component.handleDelete', () => {
    it('should set component.showDeletePrompt to false', () => {
      component.handleDelete();

      expect(component.showDeletePrompt).toBeTrue();
    });
  });

  describe('When calling component.handleDeletePrompt', () => {
    it('should call component.router.dispatch and router.navigate', () => {
      component.document = { _id: '' } as iDocument;
      component.currentUserData = { user: {} as iUser, token: 'token' };
      spyOn(component.documentApi, 'deleteDocument').and.returnValue(
        of({} as iDocument)
      );
      spyOn(component.store, 'dispatch');
      spyOn(component.router, 'navigate');
      fixture.detectChanges();

      component.handleDeletePrompt(true);

      expect(component.store.dispatch).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalled();
    });
  });

  describe('When calling component.prepareForm', () => {
    it('should set component.documentData', () => {
      component.document = {
        title: '',
        content: [{ text: '', options: [{ key: '', value: '' }] }],
        keywords: ['', ''],
      } as iDocument;
      fixture.detectChanges();

      component.prepareForm();

      expect(component.documentData).toBeTruthy();
    });
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
      component.editEnable = true;
      fixture.detectChanges();

      component.handleKeydown(mockEvent);

      expect((mockEvent.target as HTMLFormElement)['value']).toBe('\t');
    });
  });
});
