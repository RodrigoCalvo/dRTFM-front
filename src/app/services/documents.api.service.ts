import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document, iDocument } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentsApiService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:9000/document/';
  }

  getDocuments(): Observable<Array<Document>> {
    return this.http.get(this.apiUrl) as Observable<Array<Document>>;
  }

  addDocument(document: Document): Observable<Document> {
    return this.http.post(this.apiUrl, document) as Observable<Document>;
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
