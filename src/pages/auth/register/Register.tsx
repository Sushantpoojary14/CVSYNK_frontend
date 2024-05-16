import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks";
import { OCAuthModel, login } from "../../../redux/slice/authslice";
import { useMutation } from "@tanstack/react-query";
import baseAxios from "../../../hooks/axiosBaseURL";
type FormValues = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await baseAxios.post("/register", data);
    },
    onSuccess: (res) => {
      console.log(res);

      const user = res.data?.user;
      const token = res.data?.token;
      if (user && token) {
        dispatch(login({ user: user, token: token }));
        dispatch(OCAuthModel());
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    mutation.mutate(data);
  };
  console.log(mutation.data?.status);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {mutation.data?.status != 200 && (
        <>
          {mutation.data?.data?.errors?.email && (
            <Form.Text className="text-danger mb-2  d-block">
              {mutation.data?.data?.errors.email[0]}
            </Form.Text>
          )}
          {mutation.data?.data?.errors?.phoneNumber && (
            <Form.Text className="text-danger mb-2  d-block ">
              {mutation.data?.data?.errors.phoneNumber[0]}
            </Form.Text>
          )}
        </>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Full name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Full name"
          {...register("name", {
            required: true,
          })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
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
            {...register("phoneNumber", {
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
