export class Video {
  _id?: string;
  title: string;
  description: string;
  size: string;
  uploadedAt: Date;
  updatedAt: Date | null;
  views: number;
  likes: number;
  comments: any[];
  url: string;

  constructor(
    _id: string,
    title: string,
    description: string,
    size: string,
    uploadedAt: Date,
    updatedAt: Date,
    views: number,
    likes: number,
    comments: any[],
    url: string
  )
  {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.size = size;
    this.uploadedAt = uploadedAt;
    this.updatedAt = updatedAt;
    this.views = views;
    this.likes = likes;
    this.comments = comments;
    this.url = url;
  }
}
