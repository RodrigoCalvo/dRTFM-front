import { createAction, props } from '@ngrx/store';
import { iUser } from 'src/app/models/user.model';

export const loadUsers = createAction(
  '[User List] Load Users',
  props<{ users: Array<iUser> }>()
);
export const addUser = createAction(
  '[User List] Add User',
  props<{ newUser: iUser }>()
);
export const updateUser = createAction(
  '[User List] Update User',
  props<{ id: iUser['_id']; modifiedUser: iUser }>()
);
export const deleteUser = createAction(
  '[User List] Delete User',
  props<{ idToDelete: iUser['_id'] }>()
);
