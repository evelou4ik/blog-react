import Post from "../Post/Post";

import styles from './PostList.module.css'

const PostList = ({posts, requestPostById}) => {

    const sortedPostsByDate = posts.sort((a,b) => b.dateOfCreate - a.dateOfCreate)

    return (
        <ul className={styles.posts}>
            {sortedPostsByDate.map(post => {
                return (
                    <Post requestPostById={requestPostById} key={post.id} dataPost={post} />
                )
            })}
        </ul>
    );
};

export default PostList;