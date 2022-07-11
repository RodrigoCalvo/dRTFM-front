import { createReducer, on } from '@ngrx/store';
import { iDocument } from 'src/app/models/document.model';
import * as ac from './documents.action.creators';

export const initialState = {
  documents: [] as ReadonlyArray<iDocument>,
};

export const documentsReducer = createReducer(
  initialState,
  on(ac.loadDocuments, (state, { documents }) => ({
    documents: [...documents],
  })),
  on(ac.addDocument, (state, { newDocument }) => ({
    documents: [...state.documents, newDocument],
  })),
  on(ac.updateDocument, (state, { modifiedDocument }) => ({
    documents: state.documents.map((document) =>
      document._id === modifiedDocument._id
        ? { ...document, ...modifiedDocument }
        : document
    ),
  })),
  on(ac.deleteDocument, (state, { idToDelete }) => ({
    documents: state.documents.filter(
      (document) => document._id !== idToDelete
    ),
  }))
);
