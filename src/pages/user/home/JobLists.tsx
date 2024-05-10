import React from 'react'
import { Stack } from 'react-bootstrap'
import { jobList } from './homeType'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const jobDetails:jobList[] = [{
    job_tile:"WD",
    company_name:"c1",
    job_description:"tdagdduiahdiauh",
    location:"l1",
    posted_date:"12/11/23",
},{
    job_tile:"WD",
    company_name:"c1",
    job_description:"tdagdduiahdiauh",
    location:"l1",
    posted_date:"12/11/23",
},{
    job_tile:"WD",
    company_name:"c1",
    job_description:"tdagdduiahdiauh",
    location:"l1",
    posted_date:"12/11/23",
},{
    job_tile:"WD",
    company_name:"c1",
    job_description:"tdagdduiahdiauh",
    location:"l1",
    posted_date:"12/11/23",
}]


const JobLists = () => {
  return (
    <Stack gap={3} className='w-75 '>
        {
            jobDetails.map((job:jobList)=>{
                return (
                    <Card style={{ width: '80%' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Title>{job.job_tile}</Card.Title>
                      <Card.Text>
                        Description: {job.job_description}
                      </Card.Text>
                      <Card.Text>
                        Posted On: {job.location}
                      </Card.Text>
                      <Card.Text>
                        Posted On: {job.posted_date}
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card> 
                )
            })
        }
  </Stack>
  )
}

export default JobLists