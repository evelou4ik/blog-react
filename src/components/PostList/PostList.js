import uuid from 'react-uuid';
import Post from "../Post/Post";

import styles from './PostList.module.css'

const PostList = (props) => {
    const {posts, openPostById} = props;

    const sortedPostsByDate = posts.sort((a,b) => b.dateOfCreate - a.dateOfCreate);

    return (
        <ul className={styles.posts}>
            {
                sortedPostsByDate.map(post => {
                    return (
                        <Post openPostById={openPostById} key={uuid()} dataPost={post} />
                    )
                })
            }
        </ul>
    );
};

export default PostList;