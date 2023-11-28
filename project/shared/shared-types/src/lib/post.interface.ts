export interface IPost {
  _id?: string;
  title: string;
  tags?: string[];
}

export interface IPostVideo extends IPost {
  videoUrl: string;
}

export interface IPostText extends IPost {
  text: string;
  publication: string;
}

export interface IPostQuote extends Pick<IPost, 'tags' | '_id'> {
  text: string;
  author: string;
}

export interface IPostPhoto extends Pick<IPost, 'tags' | '_id'> {
  photo: string;
}

export interface IPostLink extends Pick<IPost, 'tags' | '_id'> {
  link: string;
  description: string;
}
