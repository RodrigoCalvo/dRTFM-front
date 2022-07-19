import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime } from 'rxjs';
import {
  iCurrentUserState,
  iDocumentWithoutAuthor,
} from '../../models/user.model';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-mydocs-list',
  templateUrl: './mydocs-list.component.html',
  styleUrls: ['./mydocs-list.component.scss'],
})
export class MydocsListComponent implements OnInit {
  currentUserData!: iCurrentUserState;
  search = new FormControl('');
  showArray!: Array<iDocumentWithoutAuthor>;
  delayMiddleware$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.setDelayMiddleware();
    this.loadDocuments();
  }

  setDelayMiddleware() {
    this.delayMiddleware$.pipe(debounceTime(500)).subscribe({
      next: (search) => {
        if (search.length > 2) {
          this.showArray = this.currentUserData.user.myDocuments.filter(
            (item) => item.title.toLowerCase().includes(search.toLowerCase())
          );
        } else {
          this.loadDocuments();
        }
      },
    });
  }

  sendSearch() {
    this.delayMiddleware$.next(this.search.value as string);
  }

  loadDocuments() {
    if (!(this.search.value && this.search.value.length > 2)) {
      this.store
        .select((state) => state.currentUser)
        .subscribe({
          next: (data) => {
            this.currentUserData = data;
            this.showArray = this.currentUserData.user.myDocuments;
          },
        });
    }
  }

  checkIfItIs(type: string, docId: string | undefined): boolean {
    switch (type) {
      case 'fav':
        return Boolean(
          this.currentUserData.user.myFavs.find((item) => item._id === docId)
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
