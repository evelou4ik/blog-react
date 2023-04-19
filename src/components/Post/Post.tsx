import React from 'react';
import { PostInterface, Urls } from '../types/types';

import { useNavigate } from 'react-router-dom';

import btnStyles from '../UI/Button/Button.module.css';
import postStyles from './Post.module.css';

interface Props {
  post: PostInterface;
  urls: Urls;
  onPostOpen: (postId: string) => void;
  onCheckIfValidUUID: (str: string) => boolean;
}

const Post: React.FC<Props> = (props) => {
  const { post, urls, onPostOpen, onCheckIfValidUUID } = props;

  const linkToPost = `${urls.urlPostPage}/${post.id}`;
  const navigate = useNavigate();

  const openPostHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    if (!onCheckIfValidUUID(post.id)) {
      navigate(`${urls.urlInitial}*`);
    }

    onPostOpen(post.id);
    navigate(linkToPost);
  };

  return (
    <li className={postStyles.post}>
      <div className={postStyles['post-content']}>
        <div className="post__body">
          <span>{post.title}</span>
          <p>{post.body}</p>
        </div>
        <div className={postStyles.post__footer}>
          <a href={linkToPost} className={btnStyles.btn} onClick={openPostHandler}>
            Read more
          </a>
        </div>
      </div>
    </li>
  );
};

export default Post;
