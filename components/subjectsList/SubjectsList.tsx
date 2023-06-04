import { Flex } from "@chakra-ui/react";
import { SubjectModel } from "models/client/subject.model";
import React from "react";
import Subject from "./subject/Subject";

export default function SubjecstList({ subjects, onDelete }: any) {
  return (
    <Flex flexDirection="column">
      {subjects.map((subject: SubjectModel, index: number) => (
        <Subject
          index={index}
          key={subject._id}
          subject={subject}
          onDelete={onDelete}
        />
      ))}
    </Flex>
  );
}
