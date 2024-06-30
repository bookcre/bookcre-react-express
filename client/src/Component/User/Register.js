import React, { useState } from "react";
import { LoginDiv } from "../../Style/UserCSS.js";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import firebase from "../../firebase.js";
import axios from "axios";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWconfirm, setPWconfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState("");
  let navigate = useNavigate();

  const RegisterFunc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(Name && Email && PW && PWconfirm)) {
      return alert("모든 값을 채워주세요");
    }
    if (PW !== PWconfirm) {
      return alert("비밀번호와 비밀번호 값은 같아야 합니다.");
    }
    if (!NameCheck) {
      return alert("닉네임 중복검사를 진행해주세요");
    }
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, PW);

    await createdUser.user.updateProfile({
      displayName: Name,
      photoURL: "https://kr.object.ncloudstorage.com/react-community-0807/user/profile.png",
    });

    console.log(createdUser.user);
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      photoURL: "https://kr.object.ncloudstorage.com/react-community-0807/user/profile.png",
    };

    axios.post("/api/user/register", body).then((response) => {
      setFlag(false);
      if (response.data.success) {
        //회원가입 성공시
        navigate("/login");
        return alert("회원가입이 성공하였습니다.");
      } else {
        //회원가입 실패시
        return alert("회원가입이 실패하였습니다.");
      }
    });
  };
  const NameCheckFunc = async (e) => {
    e.preventDefault();
    if (!Name) {
      return alert("닉네임을 입력해주세요");
    }

    let body = {
      displayName: Name,
    };

    await axios.post("/api/user/namecheck", body).then((response) => {
      if (response.data.success) {
        if (response.data.check) {
          setNameCheck(true);
          setNameInfo("사용가능한 닉네임입니다.");
        } else {
          setNameInfo("사용불가능한 닉네임입니다.");
        }
      }
    });
  };
  return (
    <>
      <LoginDiv>
        <form>
          <label>닉네임</label>
          <input type="name" value={Name} onChange={(e) => setName(e.target.value)} disabled={NameCheck} />
          {NameInfo}
          <button onClick={(e) => NameCheckFunc(e)}>닉네임 중복검사</button>
          <label>이메일</label>
          <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
          <label>비밀번호 (8글자 이상)</label>
          <input type="password" value={PW} minLength={8} onChange={(e) => setPW(e.target.value)} />
          <label>비밀번호 확인</label>
          <input type="password" value={PWconfirm} minLength={8} onChange={(e) => setPWconfirm(e.target.value)} />
          <button disabled={Flag} onClick={(e) => RegisterFunc(e)}>
            회원가입
          </button>
        </form>
      </LoginDiv>
    </>
  );
}

export default Register;
