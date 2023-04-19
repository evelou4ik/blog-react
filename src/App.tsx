import { PostInterface, Urls } from './components/types/types';
import { useEffect, useState } from 'react';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

const urls: Urls = {
  urlOfPosts: 'http://localhost:3001/posts/',
  urlInitial: '/',
  urlPostPage: '/postpage'
};

import Posts from './components/Posts/Posts';
import PostPage from './components/PostPage/PostPage';
import ErrorPage from './components/ErrorPage/Error-page';

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [openedPost, setOpenedPost] = useState<PostInterface | null>(null);

  const fetchApiHandler = async <T,>(
    url: string,
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    body?: T
  ): Promise<T> => {
    const options: RequestInit = {
      method: method || 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    };

    if (body) {
      options['body'] = JSON.stringify(body);
    }

    return fetch(url, options).then((response) => response.json());
  };

  const requestAllPostsHandler = async (): Promise<void> => {
    try {
      const response = await fetchApiHandler<PostInterface[]>(urls.urlOfPosts);
      setPosts(response);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestAllPostsHandler();
  }, []);

  const fetchById = async (
    postId: string,
    onSuccess: (result: PostInterface) => void
  ): Promise<void> => {
    try {
      await fetchApiHandler(`${urls.urlOfPosts}${postId}`);
      await ((result: PostInterface) => onSuccess(result));
    } catch (e) {
      setError(error);
    }
  };

  const checkIfValidUUID = (str: string): boolean => {
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
  };

  const checkAPostExistHandler = (postId: string): boolean => {
    return posts.some((post) => post.id === postId);
  };

  const openPostHandler = (postId: string): void => {
    const post = posts.find((post) => post.id === postId);

    if (post) {
      setOpenedPost(post);
    }
  };

  const updatePostHandler = (postId: string, postTitle: string, postBody: string): void => {
    fetchApiHandler(`${urls.urlOfPosts}${postId}`, 'PATCH', {
      title: postTitle,
      body: postBody
    }).then(() => {
      requestAllPostsHandler();
    });
  };

  const addNewPostHandler = (newPost: PostInterface): void => {
    fetchApiHandler(urls.urlOfPosts, 'POST', { ...newPost }).then(() => {
      requestAllPostsHandler();
    });
  };

  const deletePostHandler = (postId: string): void => {
    fetchApiHandler(`${urls.urlOfPosts}${postId}`, 'DELETE').then(() => {
      requestAllPostsHandler();
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path={urls.urlInitial}
          element={
            <Posts
              onCheckIfValidUUID={checkIfValidUUID}
              onPostOpen={openPostHandler}
              onAddNewPost={addNewPostHandler}
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
              fetchById={fetchById}
              post={openedPost}
              urls={urls}
            />
          }
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
              fetchById={fetchById}
              post={openedPost}
              urls={urls}
            />
          }
          errorElement={<ErrorPage />}
        />

        <Route path={'*'} element={<ErrorPage />} />
      </>
    )
  );

  if (error) {
    return <div>Error: {error['message']}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;
