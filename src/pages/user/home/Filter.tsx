import { Button, Form } from "react-bootstrap";
import axiosBaseURL from "../../../hooks/axiosBaseURL";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { set_posts } from "../../../redux/slice/appslice";
type FormValues = {
  state: string,
  city: string,
  category: string,
};
const Filter = () => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch } = 
  useForm<FormValues>();
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

  useQuery({
    queryKey: ["search_posts", search],
    queryFn: async () => {
      {
        const res = await axiosBaseURL.get(`search_posts/${search}`);
        console.log(res.data.posts);

        dispatch(set_posts(res.data.posts));
        return res.data;
      }
    },
    enabled: !!search,
  });
 const filterMutation = useMutation({
    mutationFn: async (data: FormValues) => {

      const filter ={
        state: Number(data.state) === 0 ? null : data.state,
        city:  Number(data.city) === 0 ? null :data.city,
        category:  Number(data.category) === 0 ? null : data.category,
      }
      return await axiosBaseURL.post("filter_posts",filter);
    },
    onSuccess: (res) => {
      console.log(res);
      dispatch(set_posts(res.data.posts));
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    filterMutation.mutate(data);
  };
  if (isLoading) {
    return <p>..loading</p>;
  }
  console.log(watch());

  return (
    <div className="filter">

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
      </Form.Group>
      {/* <Button type="submit" onClick={()}>Search</Button> */}
      <form onSubmit={handleSubmit(onSubmit)} className="filter w-100 p-0">
        <Form.Group>
          <Form.Label>Category</Form.Label>
       
          <Form.Select
            {...register("category")}
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

          <Form.Select {...register("state")} defaultValue={0} >
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
          <Form.Select {...register("city")} defaultValue={0} >
            <option value={0}>All</option>
            {data?.state
              ?.find((item1: any) => item1.id == watch()["state"])
              ?.city?.map((item2: any, key2: number) => (
                <option value={item2.id} key={key2}>
                  {item2.city_name}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit">Filter</Button>
      </form>
    </div>
  );
};

export default Filter;
