import { useEffect, useState } from "react";
import { GetPostsQuery } from "../generated/graphql";
import { getPosts } from "./service";

function App() {
  const [posts, setPosts] = useState<GetPostsQuery["posts"] | null>(null);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>React + Express</h1>
      {posts === null || posts === undefined ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post?.id}>
              <h2>{post?.title}</h2>
              <p>Author: {post?.author?.firstName} {post?.author?.lastName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
