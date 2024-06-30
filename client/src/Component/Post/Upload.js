import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload.js";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Upload(props) {
  const [Genre, setGenre] = useState("");
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");

  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인한 회원만 북리포트를 작성할 수 있습니다.");
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
      image: Image,
      genre: Genre,
      uid: user.uid,
    };

    axios
      .post("/api/post/submit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 작성이 완료되었습니다.");
          navigate("/list");
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
        북리포트 작성
      </h2>

      <UploadDiv>
        <UploadForm>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={Title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <label htmlFor="genre">장르</label>
          <select
            value={Genre}
            style={{
              borderRadius: "10px",
              border: "1px solid #c6c6c6",
              padding: "5px 0px",
            }}
            onChange={(e) => {
              setGenre(e.currentTarget.value);
            }}
          >
            <option>소설</option>
            <option>자기관리</option>
            <option>경제</option>
            <option>인문</option>
            <option>과학</option>
            <option>예술</option>
            <option>외국어</option>
            <option>시/에세이</option>
            <option>기타</option>
          </select>
          <label htmlFor="image">이미지</label>
          <ImageUpload setImage={setImage} />
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={Content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
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

export default Upload;
