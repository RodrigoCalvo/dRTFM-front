import { ActionReducerMap } from '@ngrx/store';
import { iDocumentsState } from '../models/document.model';
import { iCurrentUserState } from '../models/user.model';
import { currentUserReducer } from './currentUser.reducer/currentUser.reducer';
import { documentsReducer } from './documents.reducer/documents.reducer';

export interface AppState {
  documents: iDocumentsState;
  currentUser: iCurrentUserState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  documents: documentsReducer,
  currentUser: currentUserReducer,
};
