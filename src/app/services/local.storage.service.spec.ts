import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local.storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When calling service.getToken', () => {
    it('Should call localStorage.getItem', () => {
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify('token'));

      service.getToken();
      expect(localStorage.getItem).toHaveBeenCalled;
    });
  });
  describe('When calling service.getToken (null version)', () => {
    it('Should call localStorage.getItem', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      service.getToken();
      expect(localStorage.getItem).toHaveBeenCalled;
    });
  });

  describe('When calling service.saveToken', () => {
    it('Should call localStorage.setItem', () => {
      spyOn(localStorage, 'setItem');

      service.saveToken('token');
      expect(localStorage.setItem).toHaveBeenCalled;
    });
  });

  describe('When calling service.clearToken', () => {
    it('Should call localStorage.removeItem', () => {
      spyOn(localStorage, 'removeItem');

      service.clearToken();
      expect(localStorage.removeItem).toHaveBeenCalled;
    });
  });
});
