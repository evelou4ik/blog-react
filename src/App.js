import {useEffect, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Posts from "./components/Posts/Posts";
import PostPage from "./components/PostPage/PostPage";



function App() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoaded] = useState(true);
    const [posts, setPosts] = useState([]);
    const [openedPost, setOpenedPost] = useState(null);

    const urlOfPosts = "http://localhost:3001/posts";
    const isPostOpen = !!openedPost;

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
        fetchApiHandler(urlOfPosts)
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

    const openPostById = (idPost) => {
        const openedPost = posts.find(el => el.id === idPost);

        setOpenedPost(openedPost);
    }

    const closeHandler = () => {
        setOpenedPost(null);
    }

    const updatePostHandler = (postId, postTitle, postBody) => {
        fetchApiHandler(`${urlOfPosts}/${postId}`, 'PATCH', {title: postTitle, body: postBody})
            .then(() => {
                requestAllPostsHandler()
            })
    }

    const addNewPostHandler = (newPost) => {
        fetchApiHandler(urlOfPosts, 'POST', {...newPost})
            .then(() => {
                requestAllPostsHandler()
            })
    }

    const deletePostHandler = (postId) => {
        fetchApiHandler(`${urlOfPosts}/${postId}`, 'DELETE')
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
        <div className="App">
            {
                isPostOpen ?
                    <PostPage
                        onUpdatePost={updatePostHandler}
                        onDeletePost={deletePostHandler}
                        onClose={closeHandler}
                        post={openedPost}/>
                    :
                    <Posts onAddNewPost={addNewPostHandler} openPostById={openPostById} posts={posts}/>
            }
        </div>
    );
}

export default App;
