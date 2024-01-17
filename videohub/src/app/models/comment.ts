export class Comment {
  _id?: string;
  text: string;
  userId: string;
  fromUser: string;
  userPhoto: string;
  videoId: string;
  createdAt: Date;
  updatedAt: null | Date;
  likes: any[];

  constructor(
    _id: string,
    text: string,
    userId: string,
    fromUser: string,
    userPhoto: string,
    videoId: string,
    createdAt: Date,
    updatedAt: Date,
    likes: any[]
  )
  {
    this._id = _id;
    this.text = text;
    this.userId = userId;
    this.fromUser = fromUser;
    this.userPhoto = userPhoto;
    this.videoId = videoId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.likes = likes;
  }
}
