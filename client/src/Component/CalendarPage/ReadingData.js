import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import CalendarDiv from "../../Style/CalendarCSS";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import BookList from "./BookList.js";
import BookUpload from "./BookUpload";
import axios from "axios";

function ReadingData() {
  const [Value, setValue] = useState(new Date());
  const [Mark, setMark] = useState([]);

  // BookUpload에서 가져온 부분 시작
  const [BookTitle, setBookTitle] = useState("");
  const [Flag, setFlag] = useState(-1);

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
  // BookUpload에서 가져온 부분 끝

  let mark = moment(Value).format("YYYY년 MM월 DD일");
  let month = moment(Value).format("MM");

  let navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.accessToken) {
      alert("독서캘린더를 이용하려면 로그인 해주세요");
      navigate("/login");
    }
  }, []);

  return (
    <>
      <CalendarDiv>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h2
              className="userTitle"
              style={{
                paddingTop: "1rem",
                display: "flex",
                marginTop: "15px",
                // fontWeight: "bold",
                color: "#897868",
              }}
            >
              <div>"</div>
              <div style={{ fontWeight: "bold" }}> {user.displayName}</div>
              <div> " </div>
              <div style={{ width: "6px" }}></div>
              <div style={{ fontWeight: "bold" }}> 님의 독서캘린더 </div>
            </h2>
          </div>
        </div>
        <div>
          <Calendar
            style={{ marginLeft: "20%" }}
            onChange={setValue}
            value={Value}
            locale="en-EN"
            tileClassName={({ date, view }) => {
              if (Mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                return (
                  <>
                    <div className="flex justify-center items-center absoluteDiv">
                      <div className="dot"></div>
                    </div>
                  </>
                );
              }
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ marginRight: "8%" }}>
            <div className="bl" style={{ color: "#897868", width: "100%", marginTop: "70px", textAlign: "center", fontSize: "25px" }}>
              [ 선택 날짜 ]
            </div>
            <div style={{ marginTop: "20px", textAlign: "center", fontWeight: "bold", fontSize: "20px", borderBottom: "2px dashed #897868" }}> {moment(Value).format("YYYY년 MM월 DD일")}</div>
            <div className="bl" style={{ marginTop: "40px", color: "#897868", width: "100%", textAlign: "center", fontSize: "25px" }}>
              [ 책 이름 ]
            </div>
            <BookUpload user={user} setMark={setMark} mark={mark} Flag={Flag} setFlag={setFlag} />
          </div>
          <div>
            <BookList Flag={Flag} setMark={setMark} />
          </div>
        </div>
      </CalendarDiv>
    </>
  );
}

export default ReadingData;
