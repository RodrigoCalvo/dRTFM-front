import { createReducer, on } from '@ngrx/store';
import { iUser } from 'src/app/models/user.model';
import * as ac from './currentUser.action.creators';

export const initialState = {
  user: {} as iUser,
  token: '',
};

export const currentUserReducer = createReducer(
  initialState,
  on(ac.loadCurrentUser, (state, { currentUser, token }) => ({
    user: currentUser,
    token: token,
  }))
);
