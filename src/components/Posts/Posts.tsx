import PostList from '../PostList/PostList';
import AddNewPost from '../AddNewPost/AddNewPost';
import React from 'react';

interface PostsProps {
  posts: object;
  urls: object;
  onAddNewPost: void;
  onPostOpen: void;
  onCheckIfValidUUID: <T>(str: T) => boolean;
}

const Posts: React.FC<PostsProps> = (props) => {
  const { posts, onAddNewPost, urls, onPostOpen, onCheckIfValidUUID } = props;

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
