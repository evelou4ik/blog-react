import React from 'react';
import PostList from "../PostList/PostList";
import AddNewPost from "../AddNewPost/AddNewPost";

const Posts = ({posts, requestPostById, onAddNewPost}) => {
    return (
        <div>
            <AddNewPost onAddNewPost={onAddNewPost}/>
            <PostList requestPostById={requestPostById} posts={posts}/>
        </div>
    );
};

export default Posts;