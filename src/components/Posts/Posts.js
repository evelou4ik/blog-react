import PostList from "../PostList/PostList";
import AddNewPost from "../AddNewPost/AddNewPost";

const Posts = (props) => {
    const {posts, openPostById, onAddNewPost} = props;

    return (
        <div>
            <AddNewPost onAddNewPost={onAddNewPost}/>
            <PostList openPostById={openPostById} posts={posts}/>
        </div>
    );
};

export default Posts;