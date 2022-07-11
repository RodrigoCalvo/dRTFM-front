import { Component, OnInit } from '@angular/core';
import { iDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchArray!: Array<iDocument>;
  constructor() {}

  ngOnInit(): void {}
}
