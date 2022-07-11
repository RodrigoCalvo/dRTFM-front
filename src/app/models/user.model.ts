import { iDocument, Visibility } from './document.model';

export interface iUsersState {
  users: ReadonlyArray<iUser>;
}
export interface iCurrentUserState {
  user: iUser;
}
export interface iDocumentWithoutAuthor {
  _id?: string;
  title: string;
  content: Array<{
    text: string;
    options: Array<{
      key: string;
      value: string | number;
    }>;
  }>;
  keywords: Array<string>;
  fork?: string;
  visibility: Visibility;
}

export interface iUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  photo: string;
  myDocuments: Array<iDocumentWithoutAuthor>;
  myFavs: Array<iDocument>;
}

export class User implements iUser {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public photo: string,
    public myDocuments: Array<iDocumentWithoutAuthor>,
    public myFavs: Array<iDocument>
  ) {}
}
