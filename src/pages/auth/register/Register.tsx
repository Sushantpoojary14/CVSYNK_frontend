
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { signup } from "../../../redux/slice/authslice";
type FormValues = {
  fullname: string;
  email: string;
  password: string;
  phonenumber: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormValues> = (data:FormValues) => {
   const res = dispatch(signup(data));
   console.log(res);
   
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

        <Form.Group  className="mb-3">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Full name"
            {...register("fullname", {
              required: true,
            })}
          />
        </Form.Group>
        <Form.Group  className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
            autoComplete="username"
          />
          {errors?.email && (
            <Form.Text className="text-danger ">{`Email is required*`}</Form.Text>
          )}
        </Form.Group>
   
      
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
            autoComplete="current-password"
          />
          {errors?.password && (
            <Form.Text className="text-danger ">{`Password is required*`}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Phone Number"
              {...register("phonenumber", {
                required: true,
              })}
              autoComplete="current-password"
            />
          </InputGroup>

          {errors?.password && (
            <Form.Text className="text-danger ">{`Password is required*`}</Form.Text>
          )}
        </Form.Group>
 
      <Form.Group className="mb-3"></Form.Group>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default Register;
