import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iDocument, iDocumentDTO } from 'src/app/models/document.model';
import { iCurrentUserState, iUsersState } from 'src/app/models/user.model';
import { DocumentsApiService } from 'src/app/services/documents.api.service';
import { AppState } from 'src/app/state/app.state';
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from 'src/app/state/documents.reducer/documents.action.creators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  documentData!: {
    title: string;
    contentString: string;
    keywordsString: string;
  };
  documentId!: string;
  document!: iDocument;
  currentUserData!: iCurrentUserState;
  errorMessage!: string;
  isMine!: boolean;
  editEnable!: boolean;
  constructor(
    public documentApi: DocumentsApiService,
    public store: Store<AppState>,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.documentId = this.route.snapshot.paramMap.get('id') as string;
    this.errorMessage = 'Cargando...';
    this.isMine = false;
    this.editEnable = false;
    this.store
      .select((state) => state.documents)
      .subscribe({
        next: (data) => {
          const docFind = data.documents.find(
            (doc) => doc._id === this.documentId
          );
          if (docFind) {
            this.document = docFind;
            this.errorMessage = '';
            this.prepareForm();
            this.store
              .select((state) => state.currentUser)
              .subscribe({
                next: (data) => {
                  this.isMine = data.user._id === this.document.author._id;
                  this.currentUserData = data;
                },
              });
          } else {
            this.documentApi.getDocument(this.documentId).subscribe({
              next: (data) => {
                this.document = data;
                this.errorMessage = '';
                this.prepareForm();
                this.store.dispatch(addDocument({ newDocument: data }));
                this.store
                  .select((state) => state.currentUser)
                  .subscribe({
                    next: (data) => {
                      this.isMine = data.user._id === this.document.author._id;
                      this.currentUserData = data;
                    },
                  });
              },
              error: (err) => (this.errorMessage = 'Documento no encontrado.'),
            });
          }
        },
      });
  }

  enableEdit() {
    this.editEnable = true;
  }

  handleCancel() {
    this.editEnable = false;
    this.prepareForm();
  }

  handleFork() {
    // TODO: prompt de confirmación
    this.documentApi
      .forkDocument(this.document._id, this.currentUserData.token)
      .subscribe({
        next: (data) => this.router.navigate(['details/' + data._id]),
      });
  }

  handleSubmit() {
    const updatedDocument: Partial<iDocumentDTO> = {};
    if (this.documentData.title !== this.document.title)
      updatedDocument.title = this.documentData.title;
    if (this.documentData.contentString !== this.document.content[0].text)
      updatedDocument.content = [
        {
          text: this.documentData.contentString,
          options: [{ key: '', value: '' }],
        },
      ];
    if (this.documentData.keywordsString !== this.document.keywords.join(', '))
      updatedDocument.keywords = this.documentData.keywordsString
        .split(',')
        .map((item) => item.trim());

    this.documentApi
      .updateDocument(
        this.document._id,
        updatedDocument,
        this.currentUserData.token
      )
      .subscribe({
        next: (data) =>
          this.store.dispatch(
            updateDocument({ id: data._id, modifiedDocument: data })
          ),
      });
  }

  handleDelete() {
    // TODO prompt de confirmación
    this.documentApi
      .deleteDocument(this.document._id, this.currentUserData.token)
      .subscribe({
        next: (data) => {
          this.store.dispatch(
            deleteDocument({ idToDelete: this.document._id })
          );
          this.router.navigate(['favs']);
        },
      });
  }

  prepareForm() {
    this.documentData = {
      title: this.document.title,
      contentString: this.document.content[0].text,
      keywordsString: this.document.keywords.join(', '),
    };
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key == 'Tab' && this.editEnable) {
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
