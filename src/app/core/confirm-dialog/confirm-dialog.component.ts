import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  @Input() question!: string;
  @Output() answer = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  sendAnswer(answer: boolean) {
    this.answer.emit(answer);
  }
}
