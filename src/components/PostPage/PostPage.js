import {useState, useEffect} from 'react';
import {useNavigate, useParams, useLocation} from "react-router-dom";

import Button from "../UI/Button/Button";
import postPageStyles from './PostPage.module.css'
import btnStyles from '../UI/Button/Button.module.css'

const PostPage = (props) => {
    const { onUpdatePost, onDeletePost, fetchById, post, urls, onCheckIfValidUUID, onCheckAPostExist } = props;

    const [title, setTitle] = useState(post?.title ?? "");
    const [body, setBody] = useState(post?.body ?? "");
    const [isEditMode, setIsEditMode] = useState(false);

    const {pathname: location} = useLocation();
    const navigate = useNavigate();
    const { idPost } = useParams();

    const openHomePage = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    useEffect(() => {
            const post = onCheckAPostExist(idPost)

            if(!onCheckIfValidUUID(idPost) && !post)  {
                navigate(`${urls.urlInitial}*`)
            }

            const onSuccess = (post) => {
                setTitle(post.title);
                setBody(post.body);
            }

            fetchById(idPost, onSuccess)
    }, [])

    useEffect(() => {
        if(!location.includes("/edit")) {
            setIsEditMode(false)
            return;
        }

        setIsEditMode(true)
    }, [location])


    const editModeHandler = (e) => {
        e.preventDefault();

        setIsEditMode(!isEditMode)
        navigate(`${urls.urlPostPage}/${idPost}/edit`);
    }

    const postEditHandler = (e) => {
        e.preventDefault();

        onUpdatePost(idPost, title, body)
        setIsEditMode(!isEditMode)
        navigate(`${urls.urlPostPage}/${idPost}`);
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

        onDeletePost(idPost);
        navigate(urls.urlInitial);
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
            <a href={`${urls.urlInitial}`} className={`${btnStyles.btn} ${btnStyles["btn-dark"]}`} onClick={openHomePage}>Back</a>
        </div>
    );

};

export default PostPage;