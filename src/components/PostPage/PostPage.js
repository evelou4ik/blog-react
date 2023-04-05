import {useEffect, useState} from 'react';

import Button from "../UI/Button/Button";

import postPageStyles from './PostPage.module.css'
import btnStyles from '../UI/Button/Button.module.css'

const PostPage = ({onClose, onUpdatePost, onDeletePost, requestPosts, post}) => {
    const [isTitleValue, setIsTitleValue] = useState(post.title);
    const [isBodyValue, setIsBodyValue] = useState(post.body);
    const [isEditMode, setIsEditMode] = useState(false);

    const postEditHandler = (e) => {
        e.preventDefault();

        onUpdatePost(post.id, isTitleValue, isBodyValue)
        setIsEditMode(!isEditMode)
    }

    const changePostHandler = (e) => {
        e.preventDefault();

        setIsEditMode(!isEditMode)
    }

    const titleChangeHandler = (e) => {
        setIsTitleValue(e.target.value)
    }

    const bodyChangeHandler = (e) => {
        setIsBodyValue(e.target.value)
    }

    const deletePostHandler = () => {
        const deleteConfirm = window.confirm("Are you sure you want to delete this?")

        if (!deleteConfirm) {
            return;
        }

        onDeletePost(post.id);
        onClose();
        requestPosts();
    }


    return (
        <div className={postPageStyles['post-page']}>
            <form>
                <label>
                    <span>Title: </span>
                    <input onChange={titleChangeHandler} value={isTitleValue} type="text"
                           readOnly={isEditMode ? false : true}/>
                </label>
                <label htmlFor="">
                    <span>
                        Body Post:
                    </span>
                    <textarea onChange={bodyChangeHandler} defaultValue={isBodyValue}
                              readOnly={isEditMode ? false : true}/>
                </label>

                {
                    isEditMode ?
                        <Button className={`${btnStyles.btn} ${btnStyles["btn-dark"]}`} typeButton={"submit"}
                                onClickHandler={postEditHandler}>Update</Button> :
                        <Button className={`${btnStyles.btn} ${btnStyles["btn-dark"]}`} typeButton={"button"}
                                onClickHandler={changePostHandler}>Change</Button>
                }
            </form>
            <Button className={`${btnStyles.btn} ${btnStyles["btn-dark"]}`} type="button"
                    onClickHandler={deletePostHandler}>Delete</Button>
            <Button className={`${btnStyles.btn} ${btnStyles["btn-dark"]}`} type="button"
                    onClickHandler={onClose}>Back</Button>
        </div>
    );


};

export default PostPage;