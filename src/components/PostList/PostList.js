import uuid from 'react-uuid';
import Post from "../Post/Post";

import styles from './PostList.module.css'

const PostList = (props) => {
    const {posts, urls, onPostOpen} = props;

    const sortedPostsByDate = posts.sort((a,b) => b.dateOfCreate - a.dateOfCreate);

    return (
        <ul className={styles.posts}>
            {
                sortedPostsByDate.map(post => {
                    return (
                        <Post key={uuid()} dataPost={post} urls={urls} onPostOpen={onPostOpen}/>
                    )
                })
            }
        </ul>
    );
};

export default PostList;