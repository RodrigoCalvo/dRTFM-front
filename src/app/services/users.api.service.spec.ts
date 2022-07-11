import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { iUser } from '../models/user.model';
import { UsersApiService } from './users.api.service';

describe('Given document api service', () => {
  let service: UsersApiService;
  let httpTestingController: HttpTestingController;

  const mockUser: iUser = {
    name: '',
    email: '',
    photo: '',
    myDocuments: [],
    myFavs: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When calling service.getUsers', () => {
    it('Should fetch all users from the api', () => {
      service.getUsers().subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: 'http://localhost:9000/user/',
      });

      expect(req.request.url).toBe('http://localhost:9000/user/');

      req.flush({});
    });
  });
  describe('When calling service.getUser', () => {
    it('Should fetch the matching user from the api', () => {
      service.getUser('id').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: 'http://localhost:9000/user/id',
      });

      expect(req.request.url).toBe('http://localhost:9000/user/id');

      req.flush({});
    });
  });
  describe('When calling service.addUser', () => {
    it('Should fetch the matching user from the api', () => {
      service.addUser(mockUser).subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:9000/user/',
      });

      expect(req.request.url).toBe('http://localhost:9000/user/');

      req.flush({});
    });
  });
  describe('When calling service.loginUser', () => {
    it('Should fetch the matching user from the api', () => {
      service.loginUser('', '').subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:9000/user/login',
      });

      expect(req.request.url).toBe('http://localhost:9000/user/login');

      req.flush({});
    });
  });
  describe('When calling service.updateUser', () => {
    it('Should fetch the matching user from the api', () => {
      service.updateUser('id', mockUser).subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:9000/user/id',
      });

      expect(req.request.url).toBe('http://localhost:9000/user/id');

      req.flush({});
    });
  });
  describe('When calling service.deleteSelfUser', () => {
    it('Should fetch the matching user from the api', () => {
      service.deleteSelfUser().subscribe((res) => {
        expect(res).not.toBeNull();
        expect(JSON.stringify(res)).toEqual(JSON.stringify({}));
      });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: 'http://localhost:9000/user/',
      });

      expect(req.request.url).toBe('http://localhost:9000/user/');

      req.flush({});
    });
  });
});
