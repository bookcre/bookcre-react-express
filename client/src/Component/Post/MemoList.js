import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ListDiv, ListItem, GNBDiv, FooterDiv } from "../../Style/ListCSS.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";

function MemoList({ PostList, user }) {
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do hh시 mm분") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do hh시 mm분");
    }
  };

  // useEffect(() => {
  //   if (!user.accessToken) {
  //     alert("로그인이 필요합니다.");
  //     navigate("/login");
  //   }
  //   axios
  //     .post("/api/memopost/memolist")
  //     .then((response) => {
  //       if (response.data.success) {
  //         setPostList([...response.data.postList]);
  //         //   setFlag(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <ListDiv>
        {PostList.map((memopost, index) => {
          return (
            <>
              {user.uid === memopost.author.uid && (
                <ListItem key={index}>
                  <Link to={`/memopost/${memopost.postNum}`}>
                    <h5 className="memocontent" style={{ color: "darkgrey" }}>
                      <span style={{ fontSize: "30px", display: "center" }}>" </span>
                      {memopost.content}
                      <span style={{ fontSize: "30px", display: "center" }}> "</span>
                    </h5>
                    <p style={{ color: "darkgrey", fontSize: "15px", marginLeft: "85%" }}>
                      p. {memopost.fromPage} - p. {memopost.toPage}
                    </p>
                    <hr />
                    <div className="memotitle">{memopost.title}</div>
                    <div>{memopost.memocontent}</div>
                    <br />
                    <p
                      style={{
                        color: "darkgrey",
                        fontSize: "10px",
                        // marginLeft: "85%",
                      }}
                    >
                      {SetTime(memopost.createdAt, memopost.updatedAt)}
                    </p>
                  </Link>
                  {/* {setMemoNum(MemoNum + 1)} */}
                </ListItem>
              )}
            </>
          );
        })}
      </ListDiv>
    </>
  );
}

export default MemoList;
