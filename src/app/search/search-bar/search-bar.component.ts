import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { iDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  search = new FormControl('');
  searchArray!: Array<iDocument>;
  constructor() {}

  ngOnInit(): void {}
}
