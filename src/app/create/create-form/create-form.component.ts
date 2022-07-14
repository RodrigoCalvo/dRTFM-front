import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iDocument, iDocumentDTO } from 'src/app/models/document.model';
import {
  iCurrentUserState,
  iUser,
  iUsersState,
} from 'src/app/models/user.model';
import { DocumentsApiService } from 'src/app/services/documents.api.service';
import { AppState } from 'src/app/state/app.state';
import { addDocument } from 'src/app/state/documents.reducer/documents.action.creators';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  documentData!: {
    title: string;
    contentString: string;
    keywordsString: string;
  };
  errorMessage!: string;
  currentUserData!: iCurrentUserState;
  constructor(
    public store: Store<AppState>,
    public documentApi: DocumentsApiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.documentData = {
      title: '',
      contentString: '',
      keywordsString: '',
    };
    this.errorMessage = '';
    this.store
      .select((state) => state.currentUser)
      .subscribe({
        next: (data) => (this.currentUserData = data),
      });
  }

  handleSubmit() {
    if (this.currentUserData.user) {
      if (this.documentData.title && this.documentData.contentString) {
        const newDocument: iDocumentDTO = {
          title: this.documentData.title,
          content: [{ text: this.documentData.contentString, options: [] }],
          keywords: this.documentData.keywordsString.split(','),
          author: this.currentUserData.user._id as string,
          visibility: 'public',
        };
        this.documentApi
          .addDocument(newDocument, this.currentUserData.token)
          .subscribe({
            next: (data) => {
              this.store.dispatch(addDocument({ newDocument: data }));
              this.router.navigate(['/detail/' + data._id]);
            },
            error: (err) => {}, //lanzar prompt de error en creación
          });
      } else {
        this.errorMessage =
          'Los DRTFM deben tener al menos título y contenido.';
      }
    }
    {
      //error de usuario, mostrar prompt y deslogear
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key == 'Tab') {
      event.preventDefault();
      const eventTarget = event.target as HTMLFormElement;
      const start = eventTarget['selectionStart'];
      const end = eventTarget['selectionEnd'];
      eventTarget['value'] =
        eventTarget['value'].substring(0, start) +
        '\t' +
        eventTarget['value'].substring(end);
      eventTarget['selectionStart'] = eventTarget['selectionEnd'] = start + 1;
    }
  }
}
