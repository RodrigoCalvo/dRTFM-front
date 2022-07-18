import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { iDocument } from 'src/app/models/document.model';
import { DocumentsApiService } from 'src/app/services/documents.api.service';
import { AppState } from 'src/app/state/app.state';
import { loadDocuments } from 'src/app/state/documents.reducer/documents.action.creators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  search = new FormControl('');
  searchArray!: Array<iDocument>;
  topDocuments!: Array<iDocument>;
  delayMiddleware$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    public documentApi: DocumentsApiService,
    public store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.setDelayMiddleware();
    this.loadTopDocuments();
  }

  setDelayMiddleware() {
    this.delayMiddleware$.pipe(debounceTime(500)).subscribe({
      next: (search) => {
        this.documentApi.searchDocument(search).subscribe({
          next: (data) => {
            if (!data) {
              this.loadTopDocuments();
              return;
            }
            this.searchArray = data;
          },
        });
      },
    });
  }

  sendSearch() {
    this.delayMiddleware$.next(this.search.value as string);
  }

  loadTopDocuments() {
    if (!(this.search.value && this.search.value.length > 2)) {
      this.documentApi.getDocuments().subscribe({
        next: (data) => {
          this.searchArray = [...data];
        },
      });
    }
  }
}
