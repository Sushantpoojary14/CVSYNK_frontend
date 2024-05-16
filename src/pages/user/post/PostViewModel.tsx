import {  Card, Modal } from "react-bootstrap";

import { jobList } from "../../../assets/type/homeType";


const PostViewModel = ({
  show,
  setShow,
  job,
}: {
  show: boolean;
  setShow: any;
  job: jobList | null;
}) => {
 
 
  
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
        
          </Modal.Footer>
        </div>
      ) : null}
    </Modal>
  );
};

export default PostViewModel;
