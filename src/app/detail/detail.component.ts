import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  template: `
    <app-header></app-header>
    <app-details></app-details>
  `,
  styles: [],
})
export class DetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
