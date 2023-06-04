import * as yup from "yup";

export const addGradeSchema = yup.object().shape({
  grade: yup.string().required("*"),
  date: yup.string().required("*"),
  description: yup.string().required("*"),
});
