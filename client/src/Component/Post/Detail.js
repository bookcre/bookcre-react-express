import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { PostDiv, SpinnerDiv, Post, BtnDiv } from "../../Style/PostDetailCSS.js";
import { Spinner } from "react-bootstrap";
import RepleArea from "../Reple/RepleArea";
import Avatar from "react-avatar";

import moment from "moment";
import "moment/locale/ko";

function Detail() {
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
      .post("/api/post/detail", body)
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
        .post("/api/post/delete", body)
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
            <h1>{PostInfo.title}</h1>
            <div className="author">
              <Avatar size="40" round={true} src={PostInfo.author.photoURL} style={{ border: "1px solid #c6c6c6" }} />
              <p>{PostInfo.author.displayName}</p>
              <p className="time">{SetTime(PostInfo.createdAt, PostInfo.updatedAt)}</p>
            </div>
            {PostInfo.image ? <img src={PostInfo.image} alt="" style={{ width: "100%", height: "auto" }} /> : null}
            <p>{PostInfo.content}</p>
          </Post>
          {user.uid === PostInfo.author.uid && (
            <BtnDiv>
              <Link to={`/edit/${PostInfo.postNum}`}>
                <button className="edit">수정</button>
              </Link>
              <button className="delete" onClick={() => DeleteHandler()}>
                삭제
              </button>
            </BtnDiv>
          )}
          <RepleArea postId={PostInfo._id} />
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

export default Detail;
