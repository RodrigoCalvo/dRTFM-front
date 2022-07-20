import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  speed!: number;
  currentClass!: string;
  constructor() {}

  ngOnInit(): void {
    this.speed = 1;
    this.currentClass = 'imgr' + this.speed;
  }

  goBackFake() {
    this.speed++;
    if (this.currentClass !== 'imgr7') this.currentClass = 'imgr' + this.speed;
  }
}
