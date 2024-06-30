import React, { useState, useEffect } from "react";
import { ListDiv, ListItem, BookListItem } from "../../Style/ListCSS.js";
import axios from "axios";
import { useSelector } from "react-redux";

function BookList({ Flag, setMark }) {
  const [PostBookList, setPostBookList] = useState([]);
  const user = useSelector((state) => state.user);
  const [Sort, setSort] = useState("");

  useEffect(() => {
    let body = {
      sort: Sort,
    };

    axios
      .post("/api/booklist/showbooklist")
      .then((response) => {
        if (response.data.success) {
          setPostBookList([...response.data.postList]);
          setMark([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Flag]);

  return (
    <div style={{ marginBottom: "7vh" }}>
      <div className="bl" style={{ color: "#897868", width: "100%", marginTop: "70px", textAlign: "center", fontSize: "25px" }}>
        [ 이달의 독서 목록 ]
      </div>

      {PostBookList.map((booklist, i) => {
        return (
          <div>
            {user.uid === booklist.author.uid && (
              <BookListItem key={i}>
                <p className="title">{booklist.booktitle}</p>
                <p className="readDate">{booklist.readDate}</p>
              </BookListItem>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BookList;
