
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks";
import { OCAuthModel, login } from "../../../redux/slice/authslice";
import baseAxios from "../../../hooks/axiosBaseURL";
import { useMutation } from "@tanstack/react-query";

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
  // const user = useAppSelector((state)=>state.loginReducers.user);
  const mutation = useMutation({
    mutationFn: async (data:FormValues) => {
      return await baseAxios.post('/login', data)
    },
    onSuccess: (res) => {
      console.log(res);
      
      const user = res.data?.user;
      const token = res.data?.token;
      if (user && token) {
        dispatch(login({user:user,token:token}));
        dispatch(OCAuthModel());
      }
    },
    onError:(err)=>{
      console.log(err);
    }
  })
  const onSubmit: SubmitHandler<FormValues> = (data:FormValues) => {

   mutation.mutate(data)
  };
 console.log(mutation.isPending);
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          {mutation.data?.status != 200 && (
        <>
          {mutation.data?.data?.message&& (
            <Form.Text className="text-danger mb-2  d-block">
            Email and Password does not match
            </Form.Text>
          )}

        </>
      )}
      <Row className="mb-3">
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
      <Button type="submit" disabled={mutation.is}>Sign In</Button>
    </form>
  );
};

export default Login;
