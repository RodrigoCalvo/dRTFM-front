import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { iDocument } from 'src/app/models/document.model';
import { mockInitialState } from 'src/app/testing-mocks/mocks';
import { SearchResultsComponent } from '../search-results/search-results.component';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent, SearchResultsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [provideMockStore({ initialState: mockInitialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When calling component.sendSearch function', () => {
    it('should call delayMiddleware$.next function', () => {
      spyOn(component.delayMiddleware$, 'next');
      fixture.detectChanges();

      component.sendSearch();
      expect(component.delayMiddleware$.next).toHaveBeenCalled();
    });
  });

  describe('When calling componet.setDelayMiddleware', () => {
    it('should set component.searchArray', () => {
      spyOn(component.delayMiddleware$, 'pipe').and.returnValue(of({}));
      spyOn(component.documentApi, 'searchDocument').and.returnValue(
        of([{} as iDocument] as Array<iDocument>)
      );
      fixture.detectChanges();

      component.setDelayMiddleware();

      expect(component.searchArray).toBeTruthy();
    });
  });
  describe('When calling componet.setDelayMiddleware and data is undefined', () => {
    it('should set component.searchArray', () => {
      spyOn(component.delayMiddleware$, 'pipe').and.returnValue(of({}));
      spyOn(component.documentApi, 'searchDocument').and.returnValue(
        of(undefined)
      );
      spyOn(component, 'loadTopDocuments');
      fixture.detectChanges();

      component.setDelayMiddleware();

      expect(component.loadTopDocuments).toBeTruthy();
    });
  });

  describe('When calling component.loadTopDocuments and search.value it is shorter than 3 characters', () => {
    it('should set component.searchArray', () => {
      component.search = { value: 't' } as FormControl;
      spyOn(component.documentApi, 'getDocuments').and.returnValue(
        of([{ title: 'test' } as iDocument])
      );
      fixture.detectChanges();

      component.loadTopDocuments();

      expect(component.searchArray).toBeTruthy();
    });
  });
});
