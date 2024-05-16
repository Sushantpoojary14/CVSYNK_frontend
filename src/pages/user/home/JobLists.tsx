import { Stack } from "react-bootstrap";
import { indexType, jobList } from "../../../assets/type/homeType";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useQuery } from "@tanstack/react-query";
import axiosBaseURL from "../../../hooks/axiosBaseURL";
import { set_posts } from "../../../redux/slice/appslice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Pagination from "../../../components/Pagination";
import JobViewModel from "./JobViewModel";

const JobLists = () => {
  const list = useAppSelector((state) => state.jobListReducers);
  const [show, setShow] = useState<boolean>(false);
  const [jobData, setJobData] = useState<jobList | null>(null);
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState<indexType>({ start: 0, end: 5 });
  const [showIndex, setShowIndex] = useState<number>(1);
  const { data, isLoading } = useQuery({
    queryKey: ["all_posts", index],
    queryFn: async () => {
      {
        console.log(index.start);

        const res = await axiosBaseURL.get(`all_posts/${index.start}/4`);
        // console.log(res.data.posts);

        dispatch(set_posts(res.data.posts));
        return res.data;
      }
    },
  });
  const OpenModel = (job: jobList)=>{
    setJobData(job);
   setShow((state)=>!state)
  }
  const CloseModel = ()=>{
    setShow((state)=>!state)
   }
  if (isLoading) {
    return <p>..loading</p>;
  }
  return (
    <>
      <JobViewModel show={show} setShow={CloseModel} job={jobData}/>
      <div className="job-container">
        {list?.length === 0 ? (
          <h3>No Job Posts</h3>
        ) : (
          <>
            <Stack gap={3} className="card-container w-[90%] ">
              {list?.map((job: jobList, key: number) => {
                return (
                  <div className="card" key={key} onClick={()=>OpenModel(job)}>
                    <Card.Img
                      variant="top"
                      src={"https://picsum.photos/200"}
                      width={"40%"}
                      height={"30%"}
                    />
                    <Card.Body>
                      <Card.Title><span>Title: </span>{job.job_title}</Card.Title>
                      <Card.Title><span>Company: </span>{job.company_name}</Card.Title>
                      <Card.Text><span>Posted On: </span> {job.posted_date}</Card.Text>
                      <Card.Text>
                        <span>Location: </span>{" "}
                        {`${job.city.city_name}, ${job.state.state_name} - India`}
                      </Card.Text>
                      {/* <Button variant="primary">Apply</Button> */}
                    </Card.Body>
                  </div>
                );
              })}
            </Stack>
            <Pagination
              post_count={data?.post_count}
              setShowIndex={setShowIndex}
              setIndex={setIndex}
              index={index}
              showIndex={showIndex}
            />
          </>
        )}
      </div>
    </>
  );
};

export default JobLists;
