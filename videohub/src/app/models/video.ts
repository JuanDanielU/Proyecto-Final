export class Video {
  _id?: string;
  title: string;
  description: string;
  uploadDate: Date;
  views: number;
  likes: number;
  comments: any[];
  url: string;

  constructor(
    title: string,
    description: string,
    uploadDate: Date,
    views: number,
    likes: number,
    comments: any[],
    url: string
  )
  {
    this.title = title;
    this.description = description;
    this.uploadDate = uploadDate;
    this.views = views;
    this.likes = likes;
    this.comments = comments;
    this.url = url;
  }
}
