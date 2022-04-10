import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PostForm } from "../components/PostForm";
import { PostList } from "../components/PostList";

export const Homepage = () => {
  return (
    <>
      <title>Home Page</title>
      <div className="container">
        {/* The Page Header */}
        {/* <Header /> */}
        {/* The Page Footer */}
        <div className="row pt-4">
          <div className="col-md-5">
            <PostForm />
          </div>
          <div className="col-md-7 scrollable">
            <PostList />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};
