import React, { useEffect, useState } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { collection, doc, updateDoc } from "firebase/firestore";
import { DB } from "../config/firebase";
import { CommentPopup } from "./CommentPopup";

export const Post = ({ data, deletePost }) => {
  const { Content, File, Likes, Comments, createdAt } = data.data;
  const [Like, setLike] = useState(Likes);
  const [ShowOptions, setShowOptions] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const [OpenUserComments, setOpenUserComments] = useState(false);

  const increaeLike = () => {
    setLike(Like + 1);
  };

  const showOptions = () => {
    setShowOptions(!ShowOptions);
  };

  const handleDelete = () => {
    deletePost(data.id);
  };

  const handleCommentModal = () => {
    setShowModal(!ShowModal);
  };

  // Adding comments
  const addComment = (comment) => {
    postComments(comment);
  };

  const postComments = async (comment) => {
    let collecRef = collection(DB, "Posts");
    await updateDoc(doc(collecRef, data.id), {
      Comments: [...Comments, comment],
    });
  };

  const handleOpenComments = () => {
    setOpenUserComments(!OpenUserComments);
  };

  useEffect(() => {
    const updatePostLike = async () => {
      let collecRef = collection(DB, "Posts");
      await updateDoc(doc(collecRef, data.id), {
        Likes: Like,
      });
    };
    updatePostLike();
  }, [Like, data.id]);

  return (
    <div className="col-12 mb-4">
      <div className="card pt-3 px-3">
        <div className="row p-0 m-0">
          <span className="post-created col p-0">{createdAt}</span>
          <div className="drop-box col-auto p-0">
            <button className="more-option" onClick={showOptions}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className={ShowOptions === true ? "options show" : "options"}>
              <button className="btn btn-secondary" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="post-image">
          <img src={File} alt={Content} />
        </div>
        <div className="post-content">
          <p>{Content}</p>
        </div>
        <div className="post-info d-flex justify-content-between align-items-center">
          <span>{Likes} Likes</span>
          <span className="open-comments" onClick={handleOpenComments}>
            {Comments.length} Comments
          </span>
        </div>
        {OpenUserComments === false ? (
          <div className="post-actions d-flex align-items-center justify-content-between ">
            <button className="btn btn-like" onClick={increaeLike}>
              <RiThumbUpLine /> Like
            </button>
            <button className="btn btn-like" onClick={() => setShowModal(true)}>
              <BiMessageSquareDetail /> Comment
            </button>
            <button className="btn btn-like">
              <FiSend /> Share
            </button>
          </div>
        ) : null}

        {OpenUserComments === true ? (
          Comments.length > 0 ? (
            <div className="card p-4 mb-4 ">
              {Comments.map((item, index) => {
                return (
                  <div key={index}>
                    <ul className="list list-unstyled">
                      <li className="comment">{item}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          ) : (
            "No Comment for this Post"
          )
        ) : null}
      </div>
      <CommentPopup
        handleModal={handleCommentModal}
        openModal={ShowModal}
        addComments={addComment}
      />
    </div>
  );
};
