import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";

import Posts from "./components/Posts/Posts";
import PostPage from "./components/PostPage/PostPage";


function App() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoaded] = useState(true);
    const [posts, setPosts] = useState([]);
    const [openedPost, setOpenedPost] = useState(null);

    const urls = {
        urlOfPosts: "http://localhost:3001/posts",
        urlInitial: "/",
        urlPostPage: "/postpage",
    }

    const fetchApiHandler = async (url, method, body) => {
        const options = {
            method: method,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        if (body) {
            options.body = JSON.stringify(body)
        }

        return await fetch(url, options);
    }

    const requestAllPostsHandler = () => {
        fetchApiHandler(urls.urlOfPosts)
            .then(response => response.json())
            .then(result => {
                    setPosts(result)
                },
                (error) => {
                    setError(error);
                })
            .finally(() => {

                setIsLoaded(false);
            })
    }

    useEffect(() => {
        requestAllPostsHandler()
    }, []);

    const fetchById = (postId, onSuccess) => {
        fetchApiHandler(`${urls.urlOfPosts}/${postId}`)
            .then(response => response.json())
            .then(result => {
                onSuccess(result)
                },
                (error) => {
                    setError(error);
                })
    }

    const openPostHandler = (postId) => {
        setOpenedPost(posts.find((post) => post.id === postId))
    }

    const updatePostHandler = (postId, postTitle, postBody) => {
        fetchApiHandler(`${urls.urlOfPosts}/${postId}`, 'PATCH', {title: postTitle, body: postBody})
            .then(() => {
                requestAllPostsHandler()
            })
    }

    const addNewPostHandler = (newPost) => {
        fetchApiHandler(urls.urlOfPosts, 'POST', {...newPost})
            .then(() => {
                requestAllPostsHandler()
            })
    }

    const deletePostHandler = (postId) => {
        fetchApiHandler(`${urls.urlOfPosts}/${postId}`, 'DELETE')
            .then(() => {
                requestAllPostsHandler()
            })
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Routes>
            <Route
                path={urls.urlInitial}
                element={
                    <Posts
                        onPostOpen={openPostHandler}
                        onAddNewPost={addNewPostHandler}
                        openPostById={fetchById}
                        posts={posts}
                        urls={urls}
                    />
                }
            />
            <Route
                path={`${urls.urlInitial}/create`}
                element={
                    <Posts
                        onPostOpen={openPostHandler}
                        onAddNewPost={addNewPostHandler}
                        openPostById={fetchById}
                        posts={posts}
                        urlPostPage={urls.urlPostPage}
                    />
                }
            />
            <Route
                path={`/${urls.urlPostPage}/:idPost`}
                element={
                    <PostPage
                        onUpdatePost={updatePostHandler}
                        onDeletePost={deletePostHandler}
                        fetchById={fetchById}
                        post={openedPost}
                        urls={urls}
                    />}
            />
            <Route
                path={`/${urls.urlPostPage}/:idPost/edit`}
                element={
                    <PostPage
                        onUpdatePost={updatePostHandler}
                        onDeletePost={deletePostHandler}
                        fetchById={fetchById}
                        post={openedPost}
                        urls={urls}
                    />}
            />
        </Routes>
    );
}

export default App;
