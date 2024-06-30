import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ListDiv, ListItem, GNBDiv, FooterDiv } from "../../Style/ListCSS.js";
import Avatar from "react-avatar";

import moment from "moment";
import "moment/locale/ko";

import { DropdownButton, Dropdown } from "react-bootstrap";

function List(props) {
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do hh시 mm분") + " (수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do hh시 mm분");
    }
  };

  const [Sort, setSort] = useState("최신순");
  const [PostList, setPostList] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const getPostList = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
    };
    axios
      .post("/api/post/list", body)
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostList();
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
  };

  return (
    <>
      <GNBDiv>
        <h2
          style={{
            display: "flex",
            marginTop: "15px",
            marginLeft: "2%",
            fontWeight: "bold",
            color: "#897868",
          }}
        >
          북리포트 둘러보기
        </h2>
        <div className="search">
          <input
            type="text"
            value={SearchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) SearchHandler();
            }}
          />
          <button style={{ color: "#ffffff", backgroundColor: "#6c757d", border: "#6c757d" }} onClick={() => SearchHandler()}>
            검색
          </button>
        </div>

        <DropdownButton style={{ marginRight: "2%" }} variant="outline-secondary" title={Sort}>
          <Dropdown.Item onClick={() => setSort("최신순")}>최신순</Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("인기순")}>인기순</Dropdown.Item>
        </DropdownButton>
      </GNBDiv>

      <ListDiv>
        {PostList.map((post, idx) => {
          return (
            <ListItem key={idx}>
              <Link to={`/post/${post.postNum}`}>
                <h4 className="title">{post.title}</h4>
                <p className="genre">{post.genre}</p>
                <div className="author">
                  <div>
                    <Avatar size="40" round={true} src={post.author.photoURL} style={{ border: "1px solid #c6c6c6" }} />
                    <p className="author">{post.author.displayName}</p>
                    <p className="time">{SetTime(post.createdAt, post.updatedAt)}</p>
                  </div>
                </div>

                {post.image ? <img src={post.image} alt="" style={{ width: "80%", height: "auto" }} /> : null}
                <p>{post.content}</p>
              </Link>
            </ListItem>
          );
        })}
      </ListDiv>
    </>
  );
}

//style={{ fontSize: "10px", color: "darkgrey", alignItems: "right", marginBottom: "0px" }}

export default List;
