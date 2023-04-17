import React from 'react';
import uuid from 'react-uuid';

import Post from '../Post/Post';

import styles from './PostList.module.css';

interface PostListProps {
  posts: object;
  urls: object;
  onPostOpen: void;
  onCheckIfValidUUID: <T>(str: T) => boolean;
}

const PostList: React.FC<PostListProps> = (props) => {
  const { posts, urls, onPostOpen, onCheckIfValidUUID } = props;

  const sortedPostsByDate = posts.sort((a, b) => b.dateOfCreate - a.dateOfCreate);

  return (
    <ul className={styles.posts}>
      {sortedPostsByDate.map((post) => {
        return (
          <Post
            key={uuid()}
            dataPost={post}
            urls={urls}
            onPostOpen={onPostOpen}
            onCheckIfValidUUID={onCheckIfValidUUID}
          />
        );
      })}
    </ul>
  );
};

export default PostList;
