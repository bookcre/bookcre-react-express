import React, { useState, useEffect } from "react";
import { LoginDiv } from "../../Style/UserCSS.js";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import firebase from "../../firebase.js";

function Login() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.accessToken) {
      alert("이미 로그인이 되어있습니다");
      navigate("/");
    }
  }, []);

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  const SignInFunc = async (e) => {
    e.preventDefault();
    if (!(Email && PW)) {
      return alert("모든 값을 채워주세요");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, PW);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMsg("존재하지 않는 이메일입니다.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMsg("로그인이 실패하였습니다.");
      }
    }
  };
  useEffect(() => {
    if (user.accessToken) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  }, [ErrorMsg]);

  return (
    <>
      <LoginDiv>
        <form>
          <label>이메일</label>
          <input type="email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <label>비밀번호</label>
          <input type="password" value={PW} onChange={(e) => setPW(e.currentTarget.value)} />
          {ErrorMsg != "" && <p>{ErrorMsg}</p>}
          <button onClick={(e) => SignInFunc(e)}>로그인</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            회원가입
          </button>
        </form>
      </LoginDiv>
    </>
  );
}

export default Login;
