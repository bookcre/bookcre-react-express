import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { PostDiv, SpinnerDiv, Post, BtnDiv } from "../../Style/PostDetailCSS.js";
import { Spinner } from "react-bootstrap";

import moment from "moment";
import "moment/locale/ko";

function MemoDetail() {
  let params = useParams();
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do hh시 mm분") + " (수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do hh시 mm분");
    }
  };

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
    console.log(PostInfo);
  }, [PostInfo]);

  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/memopost/memodelete", body)
        .then((response) => {
          if (response.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };

  return (
    <PostDiv>
      {Flag ? (
        <>
          <Post>
            <h5 className="memocontent" style={{ color: "darkgrey", fontStyle: "italic", fontFamily: "Sans-serif" }}>
              <span style={{ fontSize: "30px", display: "center" }}>" </span>
              {PostInfo.content}
              <span style={{ fontSize: "30px", display: "center" }}> "</span>
            </h5>
            <p style={{ color: "darkgrey", fontSize: "15px", marginLeft: "85%" }}>
              p. {PostInfo.fromPage} - p. {PostInfo.toPage}
            </p>
            <hr />
            <div style={{ fontWeight: "bold", fontSize: "20px" }} className="memotitle">
              {PostInfo.title}
            </div>
            <div>{PostInfo.memocontent}</div>
            <br />
            <p
              style={{
                color: "darkgrey",
                fontSize: "10px",
                // marginLeft: "85%",
              }}
            >
              {SetTime(PostInfo.createdAt, PostInfo.updatedAt)}
            </p>
          </Post>
          {user.uid === PostInfo.author.uid && (
            <BtnDiv>
              <Link to={`/memoedit/${PostInfo.postNum}`}>
                <button className="edit">수정</button>
              </Link>

              <button className="delete" onClick={() => DeleteHandler()}>
                삭제
              </button>
            </BtnDiv>
          )}
        </>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
    </PostDiv>
  );
}

export default MemoDetail;

//detail부분 이해 다시
