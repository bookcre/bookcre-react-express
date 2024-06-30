import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
// import library from "./emil-widlund-xrbbXIXAWY0-unsplash.jpg";
import { useSelector } from "react-redux";
import firebase from "../firebase.js";

function Heading() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <div>
      <Navbar expand="lg" variant="dark" style={{ backgroundColor: "#211211" }}>
        <Container>
          <Navbar.Brand href="/" style={{ color: "white", fontSize: "40px", fontWeight: "bold", fontFamily: "sans-serif", marginRight: "40px" }}>
            Bookcre
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
                Home
              </Link>

              <Link to="/upload" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
                북리포트 작성
              </Link>

              <Link to="/list" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
                북리포트 둘러보기
              </Link>

              <Link to="/memo" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
                독서메모 등록
              </Link>

              <Link to="/memoList" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
                나의 독서메모
              </Link>

              <Link to="/calendar" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
                나의 독서캘린더
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {user.accessToken ? (
              <>
                <Navbar.Text style={{ color: "white", cursor: "pointer", marginRight: "20px" }} onClick={() => LogoutHandler()}>
                  Logout
                </Navbar.Text>
                <br />
                <Navbar.Text style={{ color: "white", cursor: "pointer" }}>
                  <Link to="/Mypage" style={{ color: "white", textDecoration: "none", marginRight: "20px" }}>
                    MyPage
                  </Link>
                </Navbar.Text>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Heading;
