import React, { useEffect, useState } from "react";
import { RiThumbUpLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap";
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
import { DB } from "../config/firebase";

export const Post = ({ data, deletePost }) => {
  const { Content, File, Likes, Comments, createdAt } = data.data;
  const [Like, setLike] = useState(Likes);
  const [ShowOptions, setShowOptions] = useState(false);
  const [Show, setShow] = useState(true);

  const increaeLike = () => {
    setLike(Like + 1);
  };

  const showOptions = () => {
    setShowOptions(!ShowOptions);
  };

  const handleDelete = () => {
    deletePost(data.id);
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

  const ShowModal = () => {
    return (
      <Modal show={Show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    );
  };

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
