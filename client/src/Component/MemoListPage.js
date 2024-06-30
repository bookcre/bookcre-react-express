import React, { useState, useEffect } from "react";
import MemoList from "./Post/MemoList";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { GNBDiv, FooterDiv } from "../Style/MemoListPageCSS";

function MemoListPage() {
  const navigate = useNavigate();
  const [PostList, setPostList] = useState([]);
  const user = useSelector((state) => state.user);
  const [Sort, setSort] = useState("최신순");
  const [SearchTerm, setSearchTerm] = useState("");

  const getPostList = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
    };
    axios
      .post("/api/memopost/memolist", body)
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
    if (!user.accessToken) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getPostList();
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
  };

  return (
    <div>
      <GNBDiv>
        <h2
          style={{
            display: "flex",
            marginTop: "15px",
            marginLeft: "2%",
            // fontSize:"22px",
            fontWeight: "bold",
            color: "#897868",
          }}
        >
          나의 독서메모
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
          <Dropdown.Item onClick={() => setSort("오래된순")}>오래된순</Dropdown.Item>
        </DropdownButton>
      </GNBDiv>
      <MemoList PostList={PostList} user={user} />
    </div>
  );
}

export default MemoListPage;
