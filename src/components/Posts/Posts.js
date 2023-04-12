import PostList from "../PostList/PostList";
import AddNewPost from "../AddNewPost/AddNewPost";

const Posts = (props) => {
    const {posts,onAddNewPost, urls, onPostOpen} = props;

    return (
        <div>
            <AddNewPost onAddNewPost={onAddNewPost} urls={urls}/>
            <PostList posts={posts} urls={urls} onPostOpen={onPostOpen}/>
        </div>
    );
};

export default Posts;