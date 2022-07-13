import { iDocument } from '../models/document.model';
import { AppState } from '../state/app.state';

export const mockInitialState: AppState = {
  documents: { documents: [] },
  currentUser: {
    user: {
      name: '',
      email: '',
      password: '',
      photo: '',
      myDocuments: [],
      myFavs: [],
    },
    token: '',
  },
};
