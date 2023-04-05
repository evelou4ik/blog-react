import {useState, useEffect} from 'react';
import Posts from "./components/Posts/Posts";
import PostPage from "./components/PostPage/PostPage";

function App() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoaded] = useState(true);
    const [posts, setPosts] = useState([]);
    const [openedPost, setOpenedPost] = useState(null);

    const isPostOpen = !!openedPost;

    const requestAllPosts = () => {
        fetch('http://localhost:3001/posts')
            .then(res => res.json())
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
        requestAllPosts()
    }, []);


    const requestPostById = (idPost) => {
        const openedPost = posts.find(el => el.id === idPost);

        setOpenedPost(openedPost);
    }

    const onClose = () => {
        setOpenedPost(null);
    }

    const onUpdatePost = (postId, postTitle, postBody) => {
        fetch(`http://localhost:3001/posts/${postId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: postTitle,
                postBody: postBody,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(() => {
                requestAllPosts()
            })
    }

    const onAddNewPost = (newPost) => {
        fetch('http://localhost:3001/posts', {
            method: 'POST',
            body: JSON.stringify({
                ...newPost
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
            .then(() => {
                requestAllPosts()
            })
    }

    const onDeletePost = (postId) => {
        fetch(`http://localhost:3001/posts/${postId}`, {
            method: 'DELETE'
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
                    <PostPage onUpdatePost={onUpdatePost} onDeletePost={onDeletePost} requestPosts={requestAllPosts}
                              onClose={onClose} post={openedPost}/> :
                    <Posts onAddNewPost={onAddNewPost} requestPostById={requestPostById} posts={posts}/>
            }
        </div>
    );
}

export default App;
