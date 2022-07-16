import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { iDocument } from 'src/app/models/document.model';
import { DocumentsApiService } from 'src/app/services/documents.api.service';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  documentId!: string;
  document!: iDocument;
  errorMessage!: string;
  isMine!: boolean;
  editEnable!: boolean;
  constructor(
    public documentApi: DocumentsApiService,
    public store: Store<AppState>,
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
            this.store
              .select((state) => state.currentUser)
              .subscribe({
                next: (data) =>
                  (this.isMine = data.user._id === this.document.author._id),
              });
          } else {
            this.documentApi.getDocument(this.documentId).subscribe({
              next: (data) => {
                this.document = data;
                this.errorMessage = '';
                this.store
                  .select((state) => state.currentUser)
                  .subscribe({
                    next: (data) =>
                      (this.isMine =
                        data.user._id === this.document.author._id),
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
  }
  handleFork() {}
  handleSubmit() {}
  handleDelete() {}
}
