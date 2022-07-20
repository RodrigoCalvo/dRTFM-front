import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-list',
  template: `
    <app-header></app-header>
    <ul>
      <li><a routerLink="/documents/docs">Mis DRTFM</a></li>
      <li><a routerLink="/documents/favs">Mis Favoritos</a></li>
    </ul>
  `,
  styles: [
    `
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-top: #f3f3f3 1px solid;
        border-bottom: #f3f3f3 1px solid;
        min-height: 3rem;
        width: 85vw;
        margin: auto;
        margin-top: -1px;
      }
    `,
  ],
})
export class DocumentListComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
