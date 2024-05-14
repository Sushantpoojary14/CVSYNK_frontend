import React from "react";
import { Stack } from "react-bootstrap";
import { jobList } from "./homeType";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useQuery } from "@tanstack/react-query";
import axiosBaseURL from "../../../hooks/axiosBaseURL";



const JobLists = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all_posts"],
    queryFn: async() => {
      {
        const res = await axiosBaseURL.get("all_posts");
        return res.data;
      }
    },
  });
  if(isLoading){
      return <p>..loading</p>
  }
  return (
    <Stack gap={3} className="w-75 ">
      {data.map((job: jobList) => {
        return (
          <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src={"https://picsum.photos/200"} width={"40%"} height={"30%"}/>
            <Card.Body>
              <Card.Title>{job.job_title}</Card.Title>
              <Card.Title>{job.company_name}</Card.Title>
              <Card.Text>Description: {job.job_description}</Card.Text>
              <Card.Text>Requirements: {job.job_requirement}</Card.Text>
              <Card.Text>Posted On: {job.posted_date}</Card.Text>
              <Card.Text>Location: {`${job.city}, ${job.state} - India`}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        );
      })}
    </Stack>
  );
};

export default JobLists;
