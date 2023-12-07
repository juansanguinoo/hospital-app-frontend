interface _User {
  _id: string;
  name: string;
  img: string;
}

export class Hospital {
  constructor(
    public name: string,
    public user?: _User,
    public img?: string,
    public _id?: string
  ) {}
}
