import * as yup from "yup";

export const addSubjectSchema = yup.object().shape({
  name: yup.string().required("*"),
  image: yup.string().required("*"),
});

export const iconsForSubjects = [
  {
    name: "Calculadora",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1685416137/Facultil/Calculator_qxllqw.png",
  },
  {
    name: "Libro con lápiz",
    image:
      "https://res.cloudinary.com/dhodvztdx/image/upload/v1685416137/Facultil/BookWithPencil_j4qbxh.png",
  },
];
