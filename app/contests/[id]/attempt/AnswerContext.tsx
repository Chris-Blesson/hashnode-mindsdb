"use client";
import { requestWrapper } from "@/lib/requestWrapper";
import { useParams } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";

const AnswerContext = createContext({
  answers: {},
  setAnswer: (index) => {},
  onSaveHandler: (onSaveNotification?: () => {}) => {},
  onContestEndHandler: (onContestEndNotification?: () => {}) => {},
});

export const useAnswerContext = () => {
  const contextValues = useContext(AnswerContext);
  return {
    ...contextValues,
  };
};

const AnswerContextProvider = ({ children }) => {
  const [answer, setAnswer] = useState({});
  const param = useParams();
  console.log("answer context", answer);
  const onSaveHandler = useCallback(
    async (onSaveNotification?: (response: any) => void) => {
      console.log("param get", param.id);
      const requestBody = {
        contestId: param.id,
        answers: answer,
      };
      requestWrapper("/contest/save", {
        method: "POST",
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          onSaveNotification?.(response);
        })
        .catch((err) => {
          console.log("error in answer context", err);
          throw new Error("Error in answer context");
        });
    },
    [answer]
  );
  const onContestEndHandler = useCallback(
    (onContestEndNotification?: (response: any) => void) => {
      const requestBody = {
        contestId: param.id,
        answers: answer,
      };
      requestWrapper("/contest/save", {
        method: "POST",
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          onContestEndNotification?.(response);
        })
        .catch((err) => {
          console.log("error in answer context", err);
          throw new Error("Error in answer context");
        });
    },
    [answer]
  );
  return (
    <AnswerContext.Provider
      value={{
        answers: answer,
        setAnswer,
        onSaveHandler,
        onContestEndHandler,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export default AnswerContextProvider;
