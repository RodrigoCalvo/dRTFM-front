export interface iUsersState {
  users: ReadonlyArray<iUser>;
}
export interface iCurrentUserState {
  user: iUser;
}

export interface iUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  myDocuments: Array<{ id: string; title: string }>;
  myFavs: Array<{ id: string; title: string }>;
}

export class User implements iUser {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public photo: string,
    public myDocuments: Array<{ id: string; title: string }>,
    public myFavs: Array<{ id: string; title: string }>
  ) {}
}
