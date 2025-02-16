import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required().label("Name"),
  rating: yup.number().required().min(1, "Rating must be greater than 0").label("Rating"),
});

export default schema;
