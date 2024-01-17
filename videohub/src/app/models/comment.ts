export class Comment {
  text: string;
  userId: string;
  fromUser: string;
  userPhoto: string;
  videoId: string;
  createdAt: Date;
  updatedAt: null | Date;
  likes: any[];

  constructor(
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
