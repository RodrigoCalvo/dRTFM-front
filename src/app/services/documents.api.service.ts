import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document, iDocument } from '../models/document.model';

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

  getDocument(id: iDocument['_id']): Observable<Array<iDocument>> {
    return this.http.get(this.apiUrl + id) as Observable<Array<iDocument>>;
  }

  searchDocument(query: string): Observable<Array<iDocument>> {
    return this.http.get(this.apiUrl + 'search?q=' + query) as Observable<
      Array<iDocument>
    >;
  }

  addDocument(document: iDocument): Observable<iDocument> {
    return this.http.post(this.apiUrl, document) as Observable<iDocument>;
  }

  addFavourite(id: iDocument['_id']): Observable<iDocument> {
    return this.http.patch(
      this.apiUrl + 'fav/' + id,
      {}
    ) as Observable<iDocument>;
  }

  updateDocument(
    id: iDocument['_id'],
    document: Document
  ): Observable<Document> {
    return this.http.patch(this.apiUrl + id, document) as Observable<Document>;
  }
  deleteDocument(id: iDocument['_id']): Observable<Document> {
    return this.http.delete(this.apiUrl + id) as Observable<Document>;
  }
}
