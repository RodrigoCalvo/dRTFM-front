import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  @Input() question!: string;
  response!: boolean;
  constructor() {}

  ngOnInit(): void {}

  sendAccept() {
    this.response = true;
  }
  sendReject() {
    this.response = false;
  }
}
