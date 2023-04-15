import {useNavigate} from "react-router-dom";

import postStyles from './Post.module.css';
import btnStyles from '../UI/Button/Button.module.css'

const Post = (props) => {
    const {dataPost, urls, onPostOpen, onCheckIfValidUUID} = props;

    const linkToPost = `${urls.urlPostPage}/${dataPost.id}`
    const navigate = useNavigate();

    const openPostHandler = (e) => {
        e.preventDefault();

        if(!onCheckIfValidUUID(dataPost.id)) {
           navigate(`${urls.urlInitial}*`)
        }

        onPostOpen(dataPost.id)
        navigate(linkToPost)
    }

    return (
        <li className={postStyles.post}>
            <div className={postStyles['post-content']}>
                <div className="post__body">
                    <span>{dataPost.title}</span>
                    <p>{dataPost.body}</p>
                </div>
                <div className={postStyles.post__footer}>
                    <a href={linkToPost} className={btnStyles.btn} onClick={openPostHandler}>Read more</a>
                </div>
            </div>
        </li>
    );
};

export default Post;