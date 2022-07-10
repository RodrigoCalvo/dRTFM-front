import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <app-logo [size]="72"></app-logo>
    <app-login-form> </app-login-form>
    <app-register-form> </app-register-form>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  viewRegister!: boolean;
  constructor() {}

  ngOnInit(): void {
    this.viewRegister = false;
  }
}
