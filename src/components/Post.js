import React from "react";

export const Post = ({data}) => {
  const {Content, File} = data.data;
  return (
    <div className="col-12 mb-4">
      <div className="card p-3">
        <div className="post-image">
          <img src={File} alt={Content} />
        </div>
        <div className="post-content">
          <p>{Content}</p>
        </div>
      </div>
    </div>
  );
};
