import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  template: `
    <app-header></app-header>
    <app-create-form></app-create-form>
  `,
  styles: [],
})
export class CreateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
