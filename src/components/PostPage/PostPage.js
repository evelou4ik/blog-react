import {useState} from 'react';

import Button from "../UI/Button/Button";

import postPageStyles from './PostPage.module.css'
import btnStyles from '../UI/Button/Button.module.css'

const PostPage = (props) => {
    const {onClose, onUpdatePost, onDeletePost, post} = props;

    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [isEditMode, setIsEditMode] = useState(false);

    const postEditHandler = (e) => {
        e.preventDefault();

        onUpdatePost(post.id, title, body)
        setIsEditMode(!isEditMode)
    }

    const editModeHandler = (e) => {
        e.preventDefault();

        setIsEditMode(!isEditMode)
    }

    const titleChangeHandler = (e) => {
        setTitle(e.target.value)
    }

    const bodyChangeHandler = (e) => {
        setBody(e.target.value)
    }

    const deletePostHandler = () => {
        const deleteConfirm = window.confirm("Are you sure you want to delete this?");

        if (!deleteConfirm) {
            return;
        }

        onDeletePost(post.id);
        onClose();
    }

    return (
        <div className={postPageStyles['post-page']}>
            <form>
                <label>
                    <span>Title:</span>
                    <input onChange={titleChangeHandler} value={title} type="text"
                           readOnly={isEditMode ? false : true}/>
                </label>
                <label htmlFor="">
                    <span>Body Post:</span>
                    <textarea onChange={bodyChangeHandler} value={body}
                              readOnly={isEditMode ? false : true}/>
                </label>
                {
                    isEditMode ?
                        <Button
                            className={`${btnStyles.btn} ${btnStyles["btn-dark"]}`}
                            typeButton={"submit"}
                            onClickHandler={postEditHandler}>
                            Update
                        </Button>
                        :
                        <Button
                            className={`${btnStyles.btn} ${btnStyles["btn-dark"]}`}
                            typeButton={"button"}
                            onClickHandler={editModeHandler}>
                            Change
                        </Button>
                }
            </form>
            <Button
                className={`${btnStyles.btn} ${btnStyles["btn-dark"]}`}
                type="button"
                onClickHandler={deletePostHandler}>
                Delete
            </Button>
            <Button
                className={`${btnStyles.btn} ${btnStyles["btn-dark"]}`}
                type="button"
                onClickHandler={onClose}>
                Back
            </Button>
        </div>
    );


};

export default PostPage;