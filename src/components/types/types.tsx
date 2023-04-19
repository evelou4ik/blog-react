export interface PostInterface {
  userId: number;
  id: string;
  title: string;
  body: string;
  dateOfCreate: number;
}

export interface Urls {
  urlOfPosts: string;
  urlInitial: string;
  urlPostPage: string;
}

export type QuizParams = {
  idPost: string;
};
