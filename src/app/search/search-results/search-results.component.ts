import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { iDocument } from 'src/app/models/document.model';
import { iCurrentUserState } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  @Input() searchArray!: Array<iDocument>;
  currentUserData!: iCurrentUserState;
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select((state) => state.currentUser)
      .subscribe({
        next: (data) => (this.currentUserData = data),
      });
  }

  checkIfItIs(type: string, docId: string | undefined): boolean {
    switch (type) {
      case 'fav':
        return Boolean(
          this.currentUserData.user.myFavs.find((item) => item._id === docId)
        );
      case 'mine':
        return Boolean(
          this.currentUserData.user.myDocuments.find(
            (item) => item._id === docId
          )
        );
      case 'fork':
        return Boolean(
          this.currentUserData.user.myDocuments.find(
            (item) => item.fork === docId
          )
        );
      default:
        return false;
    }
  }
}
