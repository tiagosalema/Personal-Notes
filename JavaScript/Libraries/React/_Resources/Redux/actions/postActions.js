import { FETCH_POSTS, NEW_POST } from "./types";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = () => dispatch => {
  fetch(apiEndpoint)
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

export const createPost = postData => dispatch => {
  const postInfo = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  };

  fetch(apiEndpoint, postInfo)
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};
