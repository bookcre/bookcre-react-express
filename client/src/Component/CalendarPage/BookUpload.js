import React, { useEffect, useState } from "react";
import axios from "axios";
import { UploadDiv, UploadForm, UploadButtonDiv, CalendarUploadForm } from "../../Style/BookUploadCSS.js";
import BookList from "./BookList.js";

function BookUpload({ user, mark, Flag, setFlag }) {
  const [BookTitle, setBookTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (BookTitle === "") {
      return alert("책 제목을 작성해주세요");
    }
    let body = {
      booktitle: BookTitle,
      uid: user.uid,
      readDate: mark,
    };

    axios
      .post("/api/booklist/booksubmit", body)
      .then((response) => {
        if (response.data.success) {
          alert("이달의 독서 목록이 업데이트되었습니다.");
          setFlag(-Flag);
        } else {
          alert("독서 목록 업데이트에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setBookTitle("");
  };

  return (
    <>
      <UploadDiv>
        <CalendarUploadForm>
          <input
            id="title"
            type="text"
            style={{
              width: "270px",
            }}
            value={BookTitle}
            onChange={(e) => {
              setBookTitle(e.currentTarget.value);
            }}
            placeholder="이달에 읽은 도서를 추가해보세요."
          />

          <UploadButtonDiv>
            <button
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              추가
            </button>
          </UploadButtonDiv>
        </CalendarUploadForm>
      </UploadDiv>
      {/* <BookList Flag={Flag} setMark={setMark} /> */}
    </>
  );
}

export default BookUpload;
