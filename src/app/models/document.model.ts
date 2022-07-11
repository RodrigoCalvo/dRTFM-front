type Visibility = 'public' | 'private';

export interface iDocumentsState {
  documents: ReadonlyArray<iDocument>;
}
export interface iDocument {
  _id?: string;
  title: string;
  content: Array<{
    text: string;
    options: Array<{ key: string; value: string | number }>;
  }>;
  keywords: Array<string>;
  author: string;
  fork?: string;
  visibility: Visibility;
}

export class Document implements iDocument {
  constructor(
    public title: string,
    public content: Array<{
      text: string;
      options: Array<{ key: string; value: string | number }>;
    }>,
    public keywords: Array<string>,
    public author: string,
    public visibility: Visibility
  ) {}
}
