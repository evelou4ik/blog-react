import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import uuid from 'react-uuid';

import Button from '../UI/Button/Button';

import formStyles from '../AddNewPost/AddNewPostForm.module.css';

import btnStyles from '../UI/Button/Button.module.css';

interface postFormProps {
  onAddNewPost: void;
  onShowAddPostForm: void;
}

const AddNewPostForm = (props: postFormProps) => {
  const { onAddNewPost, onShowAddPostForm } = props;

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [user, setUser] = useState('');

  const titleEditHandler = (e) => {
    setTitle(e.target.value);
  };

  const bodyEditHandler = (e) => {
    setBody(e.target.value);
  };

  const userSelectHandler = (e) => {
    setUser(e.target.value);
  };

  const resetAllInputs = () => {
    setTitle('');
    setBody('');
    setUser('');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const date = new Date().getTime();

    const postData = {
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
        <Button className={btnStyles.btn} typeButton={'submit'} onClickHandler={}>
          Add Post
        </Button>
      </div>
    </form>
  );
};

export default AddNewPostForm;
