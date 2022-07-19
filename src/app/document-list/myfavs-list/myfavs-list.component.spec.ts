import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { iDocument } from '../../models/document.model';
import { iCurrentUserState, iUser } from '../../models/user.model';
import { mockInitialState } from '../../testing-mocks/mocks';

import { MyfavsListComponent } from './myfavs-list.component';

describe('MyfavsListComponent', () => {
  let component: MyfavsListComponent;
  let fixture: ComponentFixture<MyfavsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyfavsListComponent],
      providers: [provideMockStore({ initialState: mockInitialState })],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MyfavsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('When calling component.setDelayMiddleware with search longer than 2', () => {
    it('should set showArray', () => {
      spyOn(component.delayMiddleware$, 'pipe').and.returnValue(of('test'));
      component.currentUserData = {
        user: {
          myFavs: [{ title: 'test test' }, { title: 'tset tset' }],
        } as unknown as iUser,
      } as iCurrentUserState;
      fixture.detectChanges();

      component.setDelayMiddleware();

      expect(component.showArray).not.toBeUndefined();
    });
  });
  describe('When calling component.setDelayMiddleware shorter than 3', () => {
    it('should call loadDocuments', () => {
      spyOn(component.delayMiddleware$, 'pipe').and.returnValue(of('te'));
      spyOn(component, 'loadDocuments');
      fixture.detectChanges();

      component.setDelayMiddleware();

      expect(component.loadDocuments).toHaveBeenCalled();
    });
  });

  describe('When calling component.sendSearch', () => {
    it('should call delayMiddleware.next', () => {
      spyOn(component.delayMiddleware$, 'next');
      component.search = { value: 'test' } as FormControl;
      fixture.detectChanges();

      component.sendSearch();

      expect(component.delayMiddleware$.next).toHaveBeenCalled();
    });
  });

  describe('When calling component.loadDocuments', () => {
    it('should set showArray', () => {
      component.search = { value: 't' } as FormControl;
      component.currentUserData = {
        user: {
          myFavs: [{ title: 'test test' }, { title: 'tset tset' }],
        } as unknown as iUser,
      } as iCurrentUserState;
      spyOn(component.store, 'select').and.returnValue(
        of({
          user: {
            myFavs: [{ title: 'test test' }, { title: 'tset tset' }],
          } as unknown as iUser,
        } as iCurrentUserState)
      );
      fixture.detectChanges();

      component.loadDocuments();

      expect(component.showArray).not.toBeUndefined();
    });
  });

  describe('When calling component.checkIfItIs', () => {
    describe('With type=mine', () => {
      it('should ', () => {
        component.currentUserData = {
          user: {
            myDocuments: [{ _id: 'test' }, { _id: 'tset' }],
          } as unknown as iUser,
        } as iCurrentUserState;
        fixture.detectChanges();

        const result = component.checkIfItIs('mine', 'test');

        expect(result).toBeTrue();
      });
    });
    describe('With type=fork', () => {
      it('should ', () => {
        component.currentUserData = {
          user: {
            myDocuments: [{ fork: 'test' }, { fork: 'tset' }],
          } as unknown as iUser,
        } as iCurrentUserState;
        fixture.detectChanges();

        const result = component.checkIfItIs('fork', 'test');

        expect(result).toBeTrue();
      });
    });
    describe('With no type', () => {
      it('should ', () => {
        const result = component.checkIfItIs('test', 'test');

        expect(result).toBeFalse();
      });
    });
  });
});
