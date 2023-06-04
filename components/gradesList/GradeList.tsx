import React from "react";
import Grade from "components/gradesList/grade/Grade";
import { Flex } from "@chakra-ui/react";
import { GradeModel } from "models/client/grade.model";

export default function GradeList({ grades, onDelete }: any) {
  return (
    <Flex flexDirection="column">
      {grades.map((grade: GradeModel, index: number) => (
        <Grade
          index={index}
          grade={grade}
          key={grade._id}
          onDelete={onDelete}
        />
      ))}
    </Flex>
  );
}
