import { createAction, props } from '@ngrx/store';
import { iDocument } from 'src/app/models/document.model';

export const loadDocuments = createAction(
  '[Document List] Load Documents',
  props<{ documents: Array<iDocument> }>()
);
export const addDocument = createAction(
  '[Document List] Add Document',
  props<{ newDocument: iDocument }>()
);
export const updateDocument = createAction(
  '[Document List] Update Document',
  props<{ id: iDocument['_id']; modifiedDocument: iDocument }>()
);
export const deleteDocument = createAction(
  '[Document List] Delete Document',
  props<{ idToDelete: iDocument['_id'] }>()
);
