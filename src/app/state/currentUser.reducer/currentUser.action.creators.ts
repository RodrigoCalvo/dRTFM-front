import { createAction, props } from '@ngrx/store';
import { iUser } from 'src/app/models/user.model';

export const loadCurrentUser = createAction(
  '[CurrentUser Object] Load CurrentUser',
  props<{ currentUser: iUser; token: string }>()
);
