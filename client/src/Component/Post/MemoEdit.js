import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageUpload from "./ImageUpload.js";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS.js";

function MemoEdit() {
  let params = useParams();
  let navigate = useNavigate();

  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [MemoContent, setMemoContent] = useState("");
  const [FromPage, setFromPage] = useState("");
  const [ToPage, setToPage] = useState("");

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/memopost/memodetail", body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
    setMemoContent(PostInfo.memocontent);
  }, [PostInfo]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요!");
    }

    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum,
      memocontent: MemoContent,
      fromPage: FromPage,
      toPage: ToPage,
    };

    axios
      .post("/api/memopost/memoedit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate(`/memopost/${params.postNum}`);
        } else {
          alert("글 수정에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UploadDiv>
      {Flag && (
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
              className="cancel"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              취소
            </button>
            <button
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              수정
            </button>
          </UploadButtonDiv>
        </UploadForm>
      )}
    </UploadDiv>
  );
}

export default MemoEdit;
