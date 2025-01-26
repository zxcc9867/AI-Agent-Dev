import { replace, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext, DiaryContext } from "../App";
import { useContext, useEffect, useState } from "react";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePagetitle";
const Edit = () => {
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryContext);
  const nav = useNavigate();
  const params = useParams();
  const curDiaryItem = useDiary(params.id);
  usePageTitle(`${params.id}번 일기 수정`);
  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요?")) {
      // 일기 삭제 로직
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
    }
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={
          <Button
            text={"< 뒤로 가기"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          <Button
            text={"삭제하기"}
            type={"NEGATIVE"}
            onClick={() => {
              onClickDelete();
            }}
          />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
