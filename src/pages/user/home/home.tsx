import "../../../assets/css/home.css";
import Auth from "../../auth/Auth";
import JobLists from "./JobLists";
import Filter from "./Filter";

const home = () => {
  return (
    <>
      <Auth />
      <div className="home ">
        <Filter />
        <JobLists />
      </div>
    </>
  );
};

export default home;
