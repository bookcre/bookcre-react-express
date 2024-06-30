import React from "react";
import RepleUpload from "./RepleUpload";
import RepleList from "./RepleList";
import { useSelector } from "react-redux";

import { RepleAreaDiv } from "../../Style/RepleCSS.js";
function RepleArea(props) {
  const user = useSelector((state) => state.user);

  return (
    <>
      <RepleAreaDiv>
        <h3 style={{ fontWeight: "bold", color: "#897868" }}>소통의 장</h3>
        {user.accessToken && <RepleUpload postId={props.postId} />}
        <RepleList postId={props.postId} />
      </RepleAreaDiv>
    </>
  );
}

export default RepleArea;
