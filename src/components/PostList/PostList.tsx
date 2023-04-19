import React from 'react';
import uuid from 'react-uuid';

import { PostInterface, Urls } from '../types/types';

import Post from '../Post/Post';

import styles from './PostList.module.css';

interface Props {
  posts: PostInterface[];
  urls: Urls;
  onPostOpen: (postId: string) => void;
  onCheckIfValidUUID: (str: string) => boolean;
}

const PostList: React.FC<Props> = (props) => {
  const { posts, urls, onPostOpen, onCheckIfValidUUID } = props;

  const sortedPostsByDate = posts.sort((a, b) => b.dateOfCreate - a.dateOfCreate);

  return (
    <ul className={styles.posts}>
      {sortedPostsByDate.map((post) => {
        return (
          <Post
            key={uuid()}
            post={post}
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
