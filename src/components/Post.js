import React, {useEffect, useState} from "react";
import {RiThumbUpLine} from "react-icons/ri";
import {BiMessageSquareDetail} from "react-icons/bi";
import {FiSend} from "react-icons/fi";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {DB} from "../config/firebase";

export const Post = ({data}) => {
  const {Content, File, Likes, Comments, createdAt} = data.data;
  const [Like, setLike] = useState(Likes);

  const increaeLike = () => {
    console.log(Likes);
    setLike(Like + 1);
  };

  useEffect(() => {
    const updatePostLike = async () => {
      const collecRef = collection(DB, "Posts");
      await updateDoc(doc(collecRef, data.id), {
        Likes: Like,
      });
    };

    updatePostLike();
  }, [Like]);

  return (
    <div className="col-12 mb-4">
      <div className="card pt-3 px-3">
        <span className="post-created">{createdAt}</span>
        <div className="post-image">
          <img src={File} alt={Content} />
        </div>
        <div className="post-content">
          <p>{Content}</p>
        </div>
        <div className="post-info d-flex justify-content-between align-items-center">
          <span>{Likes} Likes</span>
          <span>{Comments} Comments</span>
        </div>

        <div className="post-actions d-flex align-items-center justify-content-between ">
          <button className="btn btn-like" onClick={increaeLike}>
            <RiThumbUpLine /> Like
          </button>
          <button className="btn btn-like">
            <BiMessageSquareDetail /> Comment
          </button>
          <button className="btn btn-like">
            <FiSend /> Share
          </button>
        </div>
      </div>
    </div>
  );
};
