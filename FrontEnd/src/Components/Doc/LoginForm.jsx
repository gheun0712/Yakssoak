import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, FormLabel } from "@mui/joy";
import { Link } from "react-router-dom";
import IMG from "../../assets/images/004.jpg";

import "./LoginForm.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPass] = useState("");
  const localStorage = window.localStorage;
  const URL = "https://j7e205.p.ssafy.io/api/hospitals/login";
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      Send();
    }
  };

  function IdChange(e) {
    setId(e.target.value);
  }
  function PasswordChange(e) {
    setPass(e.target.value);
  }

  function Send() {
    console.log(id, password);
    axios
      .post(URL, { userId: id, userPassword: password })
      .then(function (res) {
        localStorage.setItem("login-token", res.data.accessToken);
        navigate("my");
      })
      .catch(function (err) {
        if (err.response.status === 401 || err.response.status === 404) {
          alert("아이디 혹은 비밀번호가 틀렸습니다.");
        } else {
          alert(err);
        }
      });
  }

  return (
    <div id="loginbox">
      <div className="login">
        <h1 className="docloginTitle" style={{ Color: "#5FD068" }}>
          병원로그인
        </h1>
        <span style={{ fontSize: 15, marginTop: 10 }}>
          약쏙(전자처방전)을 이용하기 위해서는 회원가입이 필요합니다
        </span>
        <div style={{ marginTop: 30 }}>
          <FormLabel style={{ marginBottom: 5, fontWeight: "bold" }}>
            아이디
          </FormLabel>
          <TextField
            className="a logInput"
            placeholder="아이디를 입력해주세요."
            onChange={IdChange}
          />
          <FormLabel
            style={{ marginTop: 10, marginBottom: 5, fontWeight: "bold" }}
          >
            비밀번호
          </FormLabel>
          <TextField
            className="a"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={PasswordChange}
            onKeyPress={onKeyPress}
          />
        </div>
        <button onClick={Send} id="docloginbutton" style={{ height: 50 }}>
          로그인
        </button>
        <Link to="/" className="link">
          아이디/비밀번호 찾기
        </Link>
      </div>
      <div className="info">
        <img className="logoImg" src={IMG} alt="logo" />
        <div className="buttonbox">
          <Link to="/doc/signup">
            <button className="linkbutton">회원가입</button>
          </Link>
          <Link to="/doc/serviceinfo">
            <button className="linkbutton">이용방법</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
