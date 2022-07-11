import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <app-logo [size]="72"></app-logo>
    <div *ngIf="!viewRegister; else register">
      <app-login-form> </app-login-form>
      <p><span (click)="toggleRegister()">Registrarse</span></p>
    </div>
    <ng-template #register>
      <app-register-form> </app-register-form>
      <p><span (click)="toggleRegister()">Volver</span></p>
    </ng-template>
    <p><a routerLink="/home">Continuar sin registro</a></p>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  viewRegister!: boolean;
  constructor() {}

  ngOnInit(): void {
    this.viewRegister = false;
  }

  toggleRegister() {
    this.viewRegister = !this.viewRegister;
  }
}
