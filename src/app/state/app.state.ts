import { ActionReducerMap } from '@ngrx/store';
import { iDocumentsState } from '../models/document.model';
import { iUsersState, iCurrentUserState } from '../models/user.model';
import { currentUserReducer } from './currentUser.reducer/currentUser.reducer';
import { documentsReducer } from './documents.reducer/documents.reducer';
import { usersReducer } from './users.reducer/users.reducer';

export interface AppState {
  documents: iDocumentsState;
  currentUser: iCurrentUserState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  documents: documentsReducer,
  currentUser: currentUserReducer,
};
