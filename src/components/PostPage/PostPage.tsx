import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { QuizParams, PostInterface, Urls } from '../types/types';

import Button from '../UI/Button/Button';

import btnStyles from '../UI/Button/Button.module.css';
import postPageStyles from './PostPage.module.css';

interface Props {
  onUpdatePost: (postId: string, postTitle: string, postBody: string) => void;
  onDeletePost: (postId: string) => void;
  onCheckIfValidUUID: (str: string) => boolean;
  onCheckAPostExist: (postId: string) => boolean;
  fetchById: (postId: string, onSuccess: (result: PostInterface) => void) => Promise<void>;
  post: PostInterface | null;
  urls: Urls;
}

const PostPage: React.FC<Props> = (props) => {
  const {
    onUpdatePost,
    onDeletePost,
    onCheckIfValidUUID,
    onCheckAPostExist,
    fetchById,
    post,
    urls
  } = props;

  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [body, setBody] = useState<string>(post?.body ?? '');
  const [isEditMode, setIsEditMode] = useState(false);

  const { pathname: location } = useLocation();
  const navigate = useNavigate();
  const { idPost } = useParams<QuizParams>();

  const openHomePage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(urls.urlInitial);
  };

  useEffect(() => {
    const post = onCheckAPostExist(idPost!);

    if (!onCheckIfValidUUID(idPost!) && !post) {
      navigate(`${urls.urlInitial}*`);
    }

    const onSuccess = (post: PostInterface) => {
      setTitle(post.title);
      setBody(post.body);
    };

    fetchById(idPost!, onSuccess);
  }, []);

  useEffect(() => {
    if (!location.includes('/edit')) {
      setIsEditMode(false);
      return;
    }

    setIsEditMode(true);
  }, [location]);

  const editModeHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    setIsEditMode(!isEditMode);
    navigate(`${urls.urlPostPage}/${idPost}/edit`);
  };

  const postEditHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onUpdatePost(idPost!, title, body);
    setIsEditMode(!isEditMode);
    navigate(`${urls.urlPostPage}/${idPost}`);
  };

  const titleChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const bodyChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBody(e.target.value);
  };

  const deletePostHandler = () => {
    const deleteConfirm = window.confirm('Are you sure you want to delete this?');

    if (!deleteConfirm) {
      return;
    }

    onDeletePost(idPost!);
    navigate(urls.urlInitial);
  };

  return (
    <div className={postPageStyles['post-page']}>
      <form onSubmit={postEditHandler}>
        <label>
          <span>Title:</span>
          <input onChange={titleChangeHandler} value={title} type="text" readOnly={!isEditMode} />
        </label>
        <label htmlFor="">
          <span>Body Post:</span>
          <textarea onChange={bodyChangeHandler} value={body} readOnly={!isEditMode} />
        </label>
        {isEditMode ? (
          <Button className={`${btnStyles.btn} ${btnStyles['btn-dark']}`} typeButton={'submit'}>
            Update
          </Button>
        ) : (
          <a
            href={`${urls.urlPostPage}/${idPost}`}
            className={`${btnStyles.btn} ${btnStyles['btn-dark']}`}
            onClick={editModeHandler}>
            Change
          </a>
        )}
      </form>
      <Button
        className={`${btnStyles.btn} ${btnStyles['btn-dark']}`}
        typeButton="button"
        onClickHandler={deletePostHandler}>
        Delete
      </Button>
      <a
        href={`${urls.urlInitial}`}
        className={`${btnStyles.btn} ${btnStyles['btn-dark']}`}
        onClick={openHomePage}>
        Back
      </a>
    </div>
  );
};

export default PostPage;
