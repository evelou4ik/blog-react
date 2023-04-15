import PostList from "../PostList/PostList";
import AddNewPost from "../AddNewPost/AddNewPost";

const Posts = (props) => {
    const { posts,onAddNewPost, urls, onPostOpen, onCheckIfValidUUID } = props;

    return (
        <div>
            <AddNewPost onAddNewPost={onAddNewPost}/>
            <PostList posts={posts} urls={urls} onPostOpen={onPostOpen} onCheckIfValidUUID={onCheckIfValidUUID}/>
        </div>
    );
};

export default Posts;