export class Video {
  _id?: string;
  title: string;
  description: string;
  uploadedAt: Date;
  updatedAt: Date | null;
  views: number;
  likes: number;
  comments: any[];
  userId: string;
  fromUser: string;
  userPhoto: string;
  url: string;

  constructor(
    _id: string,
    title: string,
    description: string,
    uploadedAt: Date,
    updatedAt: Date,
    views: number,
    likes: number,
    comments: any[],
    userId: string,
    fromUser: string,
    userPhoto: string,
    url: string
  )
  {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.uploadedAt = uploadedAt;
    this.updatedAt = updatedAt;
    this.views = views;
    this.likes = likes;
    this.comments = comments;
    this.userId = userId;
    this.fromUser = fromUser;
    this.userPhoto = userPhoto;
    this.url = url;
  }
}
