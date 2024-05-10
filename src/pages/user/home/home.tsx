import React from "react";
import Header from "../../../components/header/Header";
import Auth from "../../auth/Auth";
import JobLists from "./JobLists";
import Filter from "./Filter";

const home = () => {
  return (
    <>
      <Auth />
      <div className="d-flex justify-content-center  align-ite  w-75  m-auto ma">
        <Filter />
        <JobLists />
      </div>
    </>
  );
};

export default home;
