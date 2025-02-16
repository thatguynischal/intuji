import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required().label("Name"),
});

export default schema;
