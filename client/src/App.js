import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice.js";
import firebase from "./firebase.js";

import Heading from "./Component/Heading";
import List from "./Component/Post/List";
import Upload from "./Component/Post/Upload";
import Detail from "./Component/Post/Detail";
import Edit from "./Component/Post/Edit";

import RootBgr from "./Component/RootBgr";
import MemoUpload from "./Component/Post/MemoUpload";
import MemoList from "./Component/Post/MemoList";
import MemoDetail from "./Component/Post/MemoDetail";
import MemoEdit from "./Component/Post/MemoEdit";
import MemoListPage from "./Component/MemoListPage";

import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import MyPage from "./Component/User/MyPage";

import ReadingData from "./Component/CalendarPage/ReadingData";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo != null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<RootBgr />} />
        <Route path="/list" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<Detail />} />
        <Route path="/edit/:postNum" element={<Edit />} />

        <Route path="/memo" element={<MemoUpload />} />
        {/* <Route path="/memolist" element={<MemoList />} /> */}
        <Route path="/memoList" element={<MemoListPage />} />
        <Route path="/memopost/:postNum" element={<MemoDetail />} />
        <Route path="/memoedit/:postNum" element={<MemoEdit />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/calendar" element={<ReadingData />} />
      </Routes>
    </>
  );
};

export default App;
