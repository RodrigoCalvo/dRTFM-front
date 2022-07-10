import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <app-header></app-header>
    <app-search-bar></app-search-bar>
  `,
  styles: [],
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
