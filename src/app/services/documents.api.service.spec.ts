import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { iDocument, iDocumentDTO } from '../models/document.model';
import { DocumentsApiService } from './documents.api.service';

describe('Given document api service', () => {
  let service: DocumentsApiService;
  let httpTestingController: HttpTestingController;

  const mockDocument: iDocumentDTO = {
    title: '',
    content: [],
    keywords: [],
    author: '',
    visibility: 'public',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DocumentsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When calling service.getDocuments', () => {
    it('Should fetch the all documents from the api', () => {
      service.getDocuments().subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: 'http://localhost:9000/document/',
      });

      expect(req.request.url).toBe('http://localhost:9000/document/');

      req.flush({});
    });
  });
  describe('When calling service.getDocument with an id', () => {
    it('Should fetch the matching document from the api', () => {
      service.getDocument('id').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: 'http://localhost:9000/document/id',
      });

      expect(req.request.url).toBe('http://localhost:9000/document/id');

      req.flush({});
    });
  });
  describe('When calling service.searchDocument with only an id', () => {
    it('Should fetch the searched documents from the api', () => {
      service.searchDocument('query').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: 'http://localhost:9000/document/search?query=query&page=&limit=',
      });

      expect(req.request.url).toBe(
        'http://localhost:9000/document/search?query=query&page=&limit='
      );

      req.flush({});
    });
  });
  describe('When calling service.searchDocument with an id, page & limit', () => {
    it('Should fetch the searched documents from the api', () => {
      service.searchDocument('query', '1', '11').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: 'http://localhost:9000/document/search?query=query&page=1&limit=11',
      });

      expect(req.request.url).toBe(
        'http://localhost:9000/document/search?query=query&page=1&limit=11'
      );

      req.flush({});
    });
  });
  describe('When calling service.addDocument with an id', () => {
    it('Should fetch the new document added to the api', () => {
      service.addDocument(mockDocument, 'token').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:9000/document/',
      });

      expect(req.request.url).toBe('http://localhost:9000/document/');

      req.flush({});
    });
  });
  describe('When calling service.forkDocument with an id', () => {
    it('Should fetch the new document added to the api', () => {
      service.forkDocument('id', 'token').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:9000/document/id',
      });

      expect(req.request.url).toBe('http://localhost:9000/document/id');

      req.flush({});
    });
  });
  describe('When calling service.addFavourite with an id', () => {
    it('Should fetch the added-to-favs document from the api', () => {
      service.addFavourite('id', 'token').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:9000/document/fav/id',
      });

      expect(req.request.url).toBe('http://localhost:9000/document/fav/id');

      req.flush({});
    });
  });
  describe('When calling service.updateDocument with an id', () => {
    it('Should fetch the updated document from the api', () => {
      service.updateDocument('id', mockDocument, 'token').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:9000/document/id',
      });

      expect(req.request.url).toBe('http://localhost:9000/document/id');

      req.flush({});
    });
  });
  describe('When calling service.deleteDocument with an id', () => {
    it('Should fetch the deleted document from the api', () => {
      service.deleteDocument('id', 'token').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: 'http://localhost:9000/document/id',
      });

      expect(req.request.url).toBe('http://localhost:9000/document/id');

      req.flush({});
    });
  });
});
