import React, {useEffect, useState} from 'react';
import styles from './Post.module.css'

const Post = ({dataPost, onOpenPost}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openPostHandler = () => {
        if(isOpen === true) {
            setIsOpen(false)

        } else {
            setIsOpen(true)

        }
    }

    useEffect(() => {
        if(isOpen === true) {
            onOpenPost(dataPost.id)
        }
    }, [isOpen])

    return (
        <li className={styles.post}>
            <div className={styles['post-content']}>
                <div className="post__body">
                    <span>{dataPost.title}</span>
                    <p>{dataPost.body}</p>
                </div>
                <div className={styles.post__footer}>
                    <button onClick={openPostHandler} type="button" className={styles.btn}>Read more</button>
                </div>
            </div>
        </li>
    );
};

export default Post;