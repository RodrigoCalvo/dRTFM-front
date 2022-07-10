import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <app-header></app-header>
    <app-user-form></app-user-form>
  `,
  styles: [],
})
export class UserComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
