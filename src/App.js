import React, {useState, useEffect} from 'react';
import PostList from "./components/PostList/PostList";
import PostPage from "./components/PostPage/PostPage";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [items, setItems] = useState([]);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [openedPost, setOpenedPost] = useState({})

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(result => {
          setIsLoaded(true);
          setItems(result)
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        })
  }, []);

  const requestPostById = (idPost) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}`)
          .then((post) => post.json())
          .then(result => {
              setIsPostOpen(true)
              setOpenedPost(result)
          })
  }

  const closePostHandler = () => {
    setIsPostOpen(false);
  }

  if(error) {
      return <div>Error: {error.message}</div>;
  } else if(!isLoaded) {
      return <div>Loading...</div>
  } else {
      return (
          <div className="App">
              {
                  isPostOpen ? <PostPage onClose={closePostHandler} post={openedPost} /> : <PostList onOpenPost={requestPostById} posts={items}/>
              }
          </div>
      );
  }

}

export default App;
