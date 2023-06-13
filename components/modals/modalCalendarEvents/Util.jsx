import * as yup from "yup";

export const addNewEventSchema = yup.object().shape({
  time: yup.string().required("*"),
  title: yup.string().required("*"),
});
