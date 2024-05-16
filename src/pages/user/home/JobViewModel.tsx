import { Button, Card, Modal } from "react-bootstrap";

import { jobList } from "../../../assets/type/homeType";
import { useMutation, useQuery } from "@tanstack/react-query";
import tokenAxios from "../../../hooks/tokenAxios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { OCAuthModel } from "../../../redux/slice/authslice";


const JobViewModel = ({
  show,
  setShow,
  job,
}: {
  show: boolean;
  setShow: any;
  job: jobList | null;
}) => {
  const user = useAppSelector((state) => state.loginReducers.user);

  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["get_applied_job_post",show],
    queryFn: async () => {
      {
        const res = await tokenAxios.get(`get_applied_job_post/${user.id}`);
        console.log(res);
        
        return res.data;
      }
    },enabled:!!user
  });
  const jobPostMutation = useMutation({
    mutationFn: async () => {
      const data = {
        user_id: user?.id,
        post_id: job?.id,
      };

      return await tokenAxios.post("apply_job_post", data);
    },
    onSuccess: (res) => {
      console.log(res);
      setShow();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const applyJob = () => {
    if (user) {
      jobPostMutation.mutate();
    } else {
      setShow();
      dispatch(OCAuthModel());
    }
  };
  if (isLoading) {
    <h1>loading</h1>;
  }
  const applied = data?.job_applied?.includes(job?.id);
  console.log(data,user?.id);
  
  return (
    <Modal
      show={show}
      onHide={setShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {job ? (
        <div className="card flex-column ">
          <Modal.Header closeButton className="flex-column ">
            <Modal.Title id="contained-modal-title-vcenter">
              Apply Job
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="">
            <Card.Title>
              <span>Title: </span>
              {job.job_title}
            </Card.Title>
            <Card.Title>
              <span>Company: </span>
              {job.company_name}
            </Card.Title>
            <Card.Text>
              <span>Description: </span>
              {job.job_description}
            </Card.Text>
            <Card.Text>
              <span> Requirement:</span> {job.job_requirement}
            </Card.Text>
            <Card.Text>
              <span>Posted On:</span> {job.posted_date}
            </Card.Text>
            <Card.Text>
              <span>Location:</span>{" "}
              {`${job.city.city_name}, ${job.state.state_name} - India`}
            </Card.Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={applyJob} disabled={!!applied}>
             {applied ? "Applied" : "Apply"}
            </Button>
          </Modal.Footer>
        </div>
      ) : null}
    </Modal>
  );
};

export default JobViewModel;
