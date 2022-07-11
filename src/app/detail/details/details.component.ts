import { Component, Input, OnInit } from '@angular/core';
import { iDocument } from 'src/app/models/document.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() document: iDocument = {
    title: 'test',
    keywords: [''],
    author: { _id: '', name: 'test' },
    fork: '',
  } as iDocument; // data demo
  constructor() {}

  ngOnInit(): void {}
}
