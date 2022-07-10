import { Component, Input, OnInit } from '@angular/core';
import { iDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  @Input() searchArray!: Array<iDocument>;
  constructor() {}

  ngOnInit(): void {}
}
