import React, {useEffect, useState} from 'react';
import {Route,RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";

import Posts from "./components/Posts/Posts";
import PostPage from "./components/PostPage/PostPage";
import ErrorPage from "./components/ErrorPage/Error-page";

function App() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoaded] = useState(true);
    const [posts, setPosts] = useState([]);
    const [openedPost, setOpenedPost] = useState(null);

    const urls = {
        urlOfPosts: "http://localhost:3001/posts/",
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
        fetchApiHandler(`${urls.urlOfPosts}${postId}`)
            .then(response => response.json())
            .then(result => {
                onSuccess(result)
                },
                (error) => {
                    setError(error);
                })
    }

    function checkIfValidUUID(str) {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

        return regexExp.test(str);
    }

    const checkAPostExistHandler = (postId) => {
        return posts.includes((post) => post.id === postId)
    }

    const openPostHandler = (postId) => {
        const post = posts.find((post) => post.id === postId);

        setOpenedPost(post)
    }

    const updatePostHandler = (postId, postTitle, postBody) => {
        fetchApiHandler(`${urls.urlOfPosts}${postId}`, 'PATCH', {title: postTitle, body: postBody})
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
        fetchApiHandler(`${urls.urlOfPosts}${postId}`, 'DELETE')
            .then(() => {
                requestAllPostsHandler()
            })
    }

    const router = createBrowserRouter(createRoutesFromElements(
        <>
            <Route
                path={urls.urlInitial}
                element={
                    <Posts
                        onCheckIfValidUUID={checkIfValidUUID}
                        onPostOpen={openPostHandler}
                        onAddNewPost={addNewPostHandler}
                        openPostById={fetchById}
                        posts={posts}
                        urls={urls}
                    />
                }
                errorElement={<ErrorPage />}
            />
            <Route
                path={`${urls.urlInitial}create`}
                element={
                    <Posts
                        onCheckIfValidUUID={checkIfValidUUID}
                        onPostOpen={openPostHandler}
                        onAddNewPost={addNewPostHandler}
                        openPostById={fetchById}
                        posts={posts}
                        urls={urls}
                    />
                }
                errorElement={<ErrorPage />}
            />
            <Route
                path={`/${urls.urlPostPage}/:idPost`}
                element={
                    <PostPage
                        onCheckIfValidUUID={checkIfValidUUID}
                        onCheckAPostExist={checkAPostExistHandler}
                        onUpdatePost={updatePostHandler}
                        onDeletePost={deletePostHandler}
                        fetchApiHandler={fetchApiHandler}
                        fetchById={fetchById}
                        post={openedPost}
                        urls={urls}
                    />}
                errorElement={<ErrorPage />}
            />
            <Route
                path={`/${urls.urlPostPage}/:idPost/edit`}
                element={
                    <PostPage
                        onCheckIfValidUUID={checkIfValidUUID}
                        onCheckAPostExist={checkAPostExistHandler}
                        onUpdatePost={updatePostHandler}
                        onDeletePost={deletePostHandler}
                        fetchApiHandler={fetchApiHandler}
                        fetchById={fetchById}
                        post={openedPost}
                        urls={urls}
                    />}
                errorElement={<ErrorPage />}
            />


            <Route
                path={"*"}
                element={<ErrorPage/>}
            />
        </>
    ))

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <RouterProvider router={router} />
    );
}

export default App;
