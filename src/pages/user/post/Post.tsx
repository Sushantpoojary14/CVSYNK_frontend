import React, { useState } from "react";
import { PostList } from "./PostList";
import AddJobs from "./AddJobs";
import { Button } from "react-bootstrap";

const Post = () => {
  const [show, setShow] = useState<boolean>(false);

  const openCloseModel = ()=>{
    setShow(!show)
  }
  return (
    <>
      <AddJobs show={show} setShow={openCloseModel}/>
      <div className="home ">
        <div className="filter">
          <Button variant="primary w-50 m-auto" onClick={openCloseModel}>Add Jobs</Button>
        </div>
        <PostList changes={show}/>
      </div>
    </>
  );
};

export default Post;
