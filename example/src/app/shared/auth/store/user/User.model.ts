export interface IUser {
  name: string;
  email: string;
}

export class User implements IUser {
  name: string;
  email: string;

  constructor(obj: IUser) {
    this.name = obj.name;
    this.email = obj.email;
  }
}
