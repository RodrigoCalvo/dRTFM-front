import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logged!: boolean;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.currentUser)
      .subscribe({ next: (data) => (this.logged = Boolean(data.token)) });
  }

  goLogin() {
    this.router.navigate(['login']);
  }
}
