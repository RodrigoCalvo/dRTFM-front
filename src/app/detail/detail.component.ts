import { Component, OnInit } from '@angular/core';
import { iDocument } from '../models/document.model';

@Component({
  selector: 'app-detail',
  template: `
    <app-header></app-header>
    <app-details [document]="document"></app-details>
  `,
  styles: [],
})
export class DetailComponent implements OnInit {
  document!: iDocument;
  constructor() {}

  ngOnInit(): void {
    this.document = {
      title: '',
      content: [],
      keywords: [],
      author: {
        _id: '',
        name: '',
      },
      visibility: 'public',
    }; // demo data
  }
}
