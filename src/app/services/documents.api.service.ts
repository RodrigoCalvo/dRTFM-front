import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iDocument, iDocumentDTO } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentsApiService {
  apiUrl: string;
  constructor(public http: HttpClient) {
    this.apiUrl = 'http://localhost:9000/document/';
  }

  getDocuments(): Observable<Array<iDocument>> {
    return this.http.get(this.apiUrl) as Observable<Array<iDocument>>;
  }

  getDocument(id: iDocument['_id']): Observable<iDocument> {
    return this.http.get(this.apiUrl + id) as Observable<iDocument>;
  }

  searchDocument(query: string): Observable<Array<iDocument>> {
    return this.http.get(this.apiUrl + 'search?q=' + query) as Observable<
      Array<iDocument>
    >;
  }

  addDocument(
    document: iDocumentDTO,
    authToken: string
  ): Observable<iDocument> {
    return this.http.post(this.apiUrl, document, {
      headers: { Authorization: 'Bearer ' + authToken },
    }) as Observable<iDocument>;
  }

  forkDocument(id: iDocument['_id'], authToken: string): Observable<iDocument> {
    return this.http.post(
      this.apiUrl + id,
      {},
      {
        headers: { Authorization: 'Bearer ' + authToken },
      }
    ) as Observable<iDocument>;
  }

  addFavourite(id: iDocument['_id'], authToken: string): Observable<iDocument> {
    return this.http.patch(
      this.apiUrl + 'fav/' + id,
      {},
      {
        headers: { Authorization: 'Bearer ' + authToken },
      }
    ) as Observable<iDocument>;
  }

  updateDocument(
    id: iDocument['_id'],
    document: Partial<iDocumentDTO>,
    authToken: string
  ): Observable<iDocument> {
    return this.http.patch(this.apiUrl + id, document, {
      headers: { Authorization: 'Bearer ' + authToken },
    }) as Observable<iDocument>;
  }
  deleteDocument(
    id: iDocument['_id'],
    authToken: string
  ): Observable<iDocument> {
    return this.http.delete(this.apiUrl + id, {
      headers: { Authorization: 'Bearer ' + authToken },
    }) as Observable<iDocument>;
  }
}
