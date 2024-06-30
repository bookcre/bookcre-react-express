import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload.js";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function MemoUpload() {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");
  const [MemoContent, setMemoContent] = useState("");
  const [FromPage, setFromPage] = useState("");
  const [ToPage, setToPage] = useState("");

  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인한 회원만 독서메모를 작성할 수 있습니다.");
      navigate("/login");
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요");
    }
    let body = {
      title: Title,
      content: Content,
      memocontent: MemoContent,
      image: Image,
      uid: user.uid,
      fromPage: FromPage,
      toPage: ToPage,
    };

    axios
      .post("/api/memopost/memosubmit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 작성이 완료되었습니다.");
          navigate("/memolist");
        } else {
          alert("글 작성에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2
        style={{
          paddingTop: "1rem",
          display: "flex",
          marginTop: "15px",
          marginLeft: "21.8%",
          fontWeight: "bold",
          color: "#897868",
        }}
      >
        독서메모 작성
      </h2>
      <UploadDiv>
        <UploadForm>
          <label htmlFor="title">책제목</label>
          <input
            id="memotitle"
            type="text"
            value={Title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <span>
            <label htmlFor="content">시작 페이지</label>
            <input
              className="page1"
              value={FromPage}
              onChange={(e) => {
                setFromPage(e.currentTarget.value);
              }}
            />
            <label htmlFor="content">끝 페이지</label>
            <input
              className="page2"
              value={ToPage}
              onChange={(e) => {
                setToPage(e.currentTarget.value);
              }}
            />
          </span>

          {/* <ImageUpload setImage={setImage}/> */}
          <label htmlFor="content">글귀</label>
          <textarea
            id="memoSentence"
            value={Content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          />
          <label htmlFor="content">메모</label>
          <textarea
            id="memoContent"
            value={MemoContent}
            onChange={(e) => {
              setMemoContent(e.currentTarget.value);
            }}
          />
          <UploadButtonDiv>
            <button
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              제출
            </button>
          </UploadButtonDiv>
        </UploadForm>
      </UploadDiv>
    </>
  );
}

export default MemoUpload;
