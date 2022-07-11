import { createReducer, on } from '@ngrx/store';
import { iUser } from 'src/app/models/user.model';
import * as ac from './users.action.creators';

export const initialState = {
  users: [] as ReadonlyArray<iUser>,
};

export const usersReducer = createReducer(
  initialState,
  on(ac.loadUsers, (state, { users }) => ({ users: [...users] })),
  on(ac.addUser, (state, { newUser }) => ({
    users: [...state.users, newUser],
  })),
  on(ac.updateUser, (state, { modifiedUser }) => ({
    users: state.users.map((user) =>
      user._id === modifiedUser._id ? { ...user, ...modifiedUser } : user
    ),
  })),
  on(ac.deleteUser, (state, { idToDelete }) => ({
    users: state.users.filter((user) => user._id !== idToDelete),
  }))
);
