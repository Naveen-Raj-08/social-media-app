import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PostForm } from "../components/PostForm";
import { PostList } from "../components/PostList";
import { AiOutlineClose } from "react-icons/ai";

export const Homepage = () => {
  const [OpenPostForm, setOpenPostForm] = useState(false);

  const handleAddButton = () => {
    setOpenPostForm(!OpenPostForm);
  };

  return (
    <>
      <title>Home Page</title>
      <div className="container">
        {/* The Page Header */}
        <Header />
        {/* The Page Footer */}
        <div className="row pt-4">
          <div className="col-md-5 ">
            <Button
              className="add-post"
              variant="primary"
              type="button"
              onClick={handleAddButton}
            >
              Add New Post
            </Button>
            {OpenPostForm === true ? (
              <div
                className={
                  OpenPostForm === true
                    ? "post__form mobile-fixed"
                    : "post__form"
                }
              >
                <Button
                  variant="danger"
                  type="button"
                  onClick={handleAddButton}
                >
                  <AiOutlineClose />
                </Button>
                <PostForm />
              </div>
            ) : null}
            <div className="desktop-form">
              <PostForm />
            </div>
          </div>
          <div className="col-md-7 scrollable mt-5">
            <PostList />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};
