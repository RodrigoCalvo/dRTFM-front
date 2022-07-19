import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { iDocument } from 'src/app/models/document.model';
import { iCurrentUserState } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-myfavs-list',
  templateUrl: './myfavs-list.component.html',
  styleUrls: ['./myfavs-list.component.scss'],
})
export class MyfavsListComponent implements OnInit {
  currentUserData!: iCurrentUserState;
  search = new FormControl('');
  showArray!: Array<iDocument>;
  delayMiddleware$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.setDelayMiddleware();
    this.loadDocuments();
  }

  setDelayMiddleware() {
    this.delayMiddleware$.pipe(debounceTime(500)).subscribe({
      next: (search) => {
        this.showArray = this.currentUserData.user.myFavs.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
        this.loadDocuments();
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
            this.showArray = this.currentUserData.user.myFavs;
          },
        });
    }
  }

  checkIfItIs(type: string, docId: string | undefined): boolean {
    switch (type) {
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
