import React, {useEffect, useState} from "react";
import {DB} from "../config/firebase";
import {collection, getDocs} from "firebase/firestore";
import {Post} from "./Post";

export const PostList = () => {
  const [Posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const querySnapshot = await getDocs(collection(DB, "Posts"));
      const PostArr = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        PostArr.push({id: doc.id, data: doc.data()});
      });
      setPosts(PostArr);
    };
    fetchPost();
  }, [Posts]);

  return (
    <>
      <p>Here is the Post list</p>
      <div className="row">
        {Posts === null ? (
          <span className="spinner-border"></span>
        ) : (
          Posts.map((post) => <Post key={post.id} data={post} />)
        )}
      </div>
    </>
  );
};
