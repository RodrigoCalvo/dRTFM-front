import { Component, OnInit } from '@angular/core';
import { iUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  currentUser: iUser = { name: 'test', email: 'tes@test.com' } as iUser; //data demo
  constructor() {}

  ngOnInit(): void {}
}
