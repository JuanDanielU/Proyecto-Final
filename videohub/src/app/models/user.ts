export class User {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: null | Date;
  photoURL: null | string;

  constructor(
    _id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    photoURL: string
  )
  {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.photoURL = photoURL;
  }
}
