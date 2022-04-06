import {DB, ref, storage} from "../config/firebase";
import React, {useState} from "react";
import {getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";

export const PostForm = () => {
  const [PostImage, setPostImage] = useState(null);
  const [PostContent, setPostContent] = useState("");
  const [ProgressBar, setProgressBar] = useState(0);
  const [ShowProgress, setShowProgress] = useState(false);
  const [FileName, setFileName] = useState();

  const postFile = (e) => {
    let file = e.target.files[0];
    setFileName(file.name);
    uploadFile(file);
  };

  const uploadFile = (file) => {
    const PNG = "image/png";
    const JPEG = "image/jpeg";
    if (file.type === PNG || file.type === JPEG) {
      const storageRef = ref(storage, `/images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //takes a snap shot of the process as it is happening
          setShowProgress(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressBar(progress);
          if (progress === 100) {
            setTimeout(() => {
              setShowProgress(false);
            }, 1500);
          }
        },
        (err) => {
          //catches the errors
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPostImage(downloadURL);
          });
        }
      );
    } else {
      alert("Pls provide the correct file type");
    }
  };

  const postContent = (e) => {
    let content = e.target.value;
    setPostContent(content.trim());
  };
  const postSubmit = (e) => {
    e.preventDefault();
    const timeStamp = new Date().toLocaleString();
    let postData = {
      createdAt: timeStamp,
      File: PostImage,
      Content: PostContent,
      Likes: 0,
      Comments: 0,
    };

    addData(postData);
    e.target.reset();
    setFileName("");
  };

  const addData = async (data) => {
    const docRef = await addDoc(collection(DB, "Posts"), data);
    console.log("Document written with ID: ", docRef.id);
  };

  return (
    <div>
      <form className="pt-2 post-form" onSubmit={postSubmit} autoComplete="off">
        {ShowProgress === true ? (
          <p
            className="progress-bar"
            style={{width: `${ProgressBar}%`, height: "5px"}}
          ></p>
        ) : null}
        <div className="fieldset input">
          <input className="field" type="file" onChange={postFile} />
          <span>{FileName}</span>
        </div>
        <div className="fieldset">
          <textarea
            className="text-area field"
            placeholder="Say Something..."
            onChange={postContent}
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};
