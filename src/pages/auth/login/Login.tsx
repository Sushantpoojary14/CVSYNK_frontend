import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import {useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { login } from "../../../redux/slice/authslice";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const message = useAppSelector((state)=>state.loginReducers.message);
  const onSubmit: SubmitHandler<FormValues> = (data:FormValues) => {
   const res = dispatch(login(data));
   console.log(res);
   
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
      {<Form.Text className="text-danger ">{`${message}*`}</Form.Text>}
        <Form.Group >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              
            })}
      
          />
          {errors?.email && (
            <Form.Text className="text-danger ">{`Email is required*`}</Form.Text>
          )}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
            
          />
          {errors?.password && (
            <Form.Text className="text-danger ">{`Password is required*`}</Form.Text>
          )}
        </Form.Group>
      </Row>
      <Form.Group className="mb-3"></Form.Group>
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default Login;
