export interface iUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    photo: string;
    myDocuments: Array<string>;
    myFavs: Array<string>;
}

export class User implements iUser {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public photo: string,
        public myDocuments: string[],
        public myFavs: string[]
    ) {}
}
