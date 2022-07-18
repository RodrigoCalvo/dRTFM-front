import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { iDocument } from 'src/app/models/document.model';
import { iUser } from 'src/app/models/user.model';
import { mockInitialState } from 'src/app/testing-mocks/mocks';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  // describe('When calling component.handleSubmit', () => {

  // });

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
