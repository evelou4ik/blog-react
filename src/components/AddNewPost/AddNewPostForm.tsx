import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

import { PostInterface } from '../types/types';

import Button from '../UI/Button/Button';

import formStyles from '../AddNewPost/AddNewPostForm.module.css';
import btnStyles from '../UI/Button/Button.module.css';

interface Props {
  onAddNewPost: (newPost: PostInterface) => void;
  onShowAddPostForm: () => void;
}

const AddNewPostForm: React.FC<Props> = (props) => {
  const { onAddNewPost, onShowAddPostForm } = props;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  const titleEditHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };

  const bodyEditHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBody(e.currentTarget.value);
  };

  const userSelectHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setUser(e.currentTarget.value);
  };

  const resetAllInputs = (): void => {
    setTitle('');
    setBody('');
    setUser('');
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const date = new Date().getTime();

    const postData: PostInterface = {
      userId: Number(user),
      id: uuid(),
      title: title,
      body: body,
      dateOfCreate: date
    };

    onAddNewPost(postData);
    resetAllInputs();
    navigate('/');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={formStyles['new-post__controls']}>
        <div className={formStyles['new-post__control']}>
          <label>Title</label>
          <input type="text" onChange={titleEditHandler} value={title} />
        </div>
        <div className={formStyles['new-post__control']}>
          <label>Post body</label>
          <textarea onChange={bodyEditHandler} value={body} />
        </div>
        <div className={formStyles['new-post__control']}>
          <label>User</label>
          <select value={user} onChange={userSelectHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <div className={formStyles['new-post__actions']}>
        <Button className={btnStyles.btn} typeButton={'button'} onClickHandler={onShowAddPostForm}>
          Cancel
        </Button>
        <Button className={btnStyles.btn} typeButton={'submit'}>
          Add Post
        </Button>
      </div>
    </form>
  );
};

export default AddNewPostForm;
