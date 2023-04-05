import {useEffect, useState} from 'react';

import Button from "../UI/Button/Button";

import postStyles from './Post.module.css';
import btnStyles from '../UI/Button/Button.module.css'



const Post = ({dataPost, requestPostById}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openPostHandler = () => {
        setIsOpen(!isOpen)
        requestPostById(dataPost.id)
    }

    return (
        <li className={postStyles.post}>
            <div className={postStyles['post-content']}>
                <div className="post__body">
                    <span>{dataPost.title}</span>
                    <p>{dataPost.body}</p>
                </div>
                <div className={postStyles.post__footer}>
                    <Button className={btnStyles.btn} typeButton={"button"} onClickHandler={openPostHandler}>Read more</Button>
                </div>
            </div>
        </li>
    );
};

export default Post;