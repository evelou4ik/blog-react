import React from 'react';
import { PostInterface, Urls } from '../types/types';

import PostList from '../PostList/PostList';
import AddNewPost from '../AddNewPost/AddNewPost';

interface Props {
  posts: PostInterface[];
  urls: Urls;
  onAddNewPost: (newPost: PostInterface) => void;
  onPostOpen: (postId: string) => void;
  onCheckIfValidUUID: (str: string) => boolean;
}

const Posts: React.FC<Props> = (props) => {
  const { posts, urls, onAddNewPost, onPostOpen, onCheckIfValidUUID } = props;
  return (
    <div>
      <AddNewPost onAddNewPost={onAddNewPost} />
      <PostList
        posts={posts}
        urls={urls}
        onPostOpen={onPostOpen}
        onCheckIfValidUUID={onCheckIfValidUUID}
      />
    </div>
  );
};

export default Posts;
