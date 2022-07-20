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
