import { Form, InputGroup } from "react-bootstrap";

const Filter = () => {
  return (
    <div className="filter">
      <h3>Filter </h3>

      <Form.Control
        placeholder="Search"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
      <Form.Select>
        <option>Default select</option>
      </Form.Select>
      <Form.Select>
        <option>Default select</option>
      </Form.Select>
    </div>
  );
};

export default Filter;
