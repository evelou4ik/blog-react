import React from 'react';
import Post from "../Post/Post";

import styles from './PostList.module.css'

const PostList = ({posts, onOpenPost}) => {
    return (
        <ul className={styles.posts}>
            {posts.map(post => {
                if(post.id < 11) {
                    return (
                        <Post onOpenPost={onOpenPost} key={post.id} dataPost={post} />
                    )
                }
            })}
        </ul>
    );
};

export default PostList;