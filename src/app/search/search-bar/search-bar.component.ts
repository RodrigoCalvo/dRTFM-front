import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { iDocument } from 'src/app/models/document.model';
import { DocumentsApiService } from 'src/app/services/documents.api.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  search = new FormControl('');
  searchArray!: Array<iDocument>;
  delayMiddleware$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(public documentApi: DocumentsApiService) {
    this.delayMiddleware$.pipe(debounceTime(500)).subscribe({
      next: (search) => {
        documentApi.searchDocument(search).subscribe({
          next: (data) => {
            this.searchArray = data;
          },
        });
      },
    });
  }

  ngOnInit(): void {}

  sendSearch() {
    this.delayMiddleware$.next(this.search.value as string);
  }
}
