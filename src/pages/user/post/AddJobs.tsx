import React from 'react'
import {  Button, Form, InputGroup, Modal } from 'react-bootstrap'
import {  SubmitHandler, useForm } from 'react-hook-form'
import tokenAxios from '../../../hooks/tokenAxios';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosBaseURL from '../../../hooks/axiosBaseURL';
import { useAppSelector } from '../../../redux/hooks';

const AddJobs = ({show,setShow}:{show:boolean,setShow:any}) => {
    const user = useAppSelector((state) => state.loginReducers.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
      } = useForm<any>();
    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const jobData = {
                ...data,
                user_id:user?.id
            };
            console.log(jobData);
            
          return await tokenAxios.post("/add_user_posts", jobData);
        },
        onSuccess: (res) => {
          console.log(res);
          setShow();
        },
        onError: (err) => {
          console.log(err);
        },
      });
      const onSubmit: SubmitHandler<any> = (data: any) => {
        console.log(data);
        mutation.mutate(data);
      };
 
      const { data, isLoading } = useQuery({
        queryKey: ["all_filter_details"],
        queryFn: async () => {
          {
            const res = await axiosBaseURL.get(`all_filter_details`);
    
            //
            return res.data;
          }
        },
      });
      if (isLoading) {
        return <p>..loading</p>;
      }
  return (
    <Modal
    show={show}
    onHide={setShow}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
 
      <div className="card flex-column ">
        <Modal.Header closeButton className="flex-column ">
          <Modal.Title id="contained-modal-title-vcenter">
            Add Post
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="">
        <Form onSubmit={handleSubmit(onSubmit)}>
   
      <Form.Group className="mb-3">
        <Form.Label>Company Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Company Name"
          {...register("company_name", {
            required: true,
          })}
        />
         {errors?.company_name && (
          <Form.Text className="text-danger ">{`Company Name is required*`}</Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Job Title"
          {...register("job_title", {
            required: true,
          })}
     
        />
        {errors?.job_title && (
          <Form.Text className="text-danger ">{`Job Title is required*`}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Job Requirement</Form.Label>
        <Form.Control
          type="text"
          placeholder="Job Requirement"
          {...register("job_requirement", {
            required: true,
          })}
        />
        {errors?.password && (
          <Form.Text className="text-danger ">{`Job Requirement is required*`}</Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Job Description</Form.Label>
        <InputGroup className="mb-3">
         
          <Form.Control
            type="text"
            placeholder="Job Description"
            {...register("job_description", {
              required: true,
            })}
            autoComplete="current-password"
          />
        </InputGroup>

        {errors?.job_description && (
          <Form.Text className="text-danger ">{`Job Description is required*`}</Form.Text>
        )}
      </Form.Group>
      <Form.Group>
          <Form.Label>Category</Form.Label>
       
          <Form.Select
            {...register("job_category_id")}
            defaultValue={0}
     
          >
            <option value={0}>All</option>
            {data?.job_categories?.map((item: any, key: number) => (
              <option value={item.id} key={key}>
                {item.job_category_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>

          <Form.Select {...register("state_id")} defaultValue={0} >
            <option value={0}>All</option>
            {data?.state?.map((item: any, key: number) => (
              <option value={item.id} key={key}>
                {item.state_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Select {...register("city_id")} defaultValue={0} >
            <option value={0}>All</option>
            {data?.state
              ?.find((item1: any) => item1.id == watch()["state_id"])
              ?.city?.map((item2: any, key2: number) => (
                <option value={item2.id} key={key2}>
                  {item2.city_name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

      <Form.Group className="mb-3"></Form.Group>
      <Button type="submit">Add</Button>
    </Form>
        </Modal.Body>

      </div>
 
  </Modal>
  )
}

export default AddJobs