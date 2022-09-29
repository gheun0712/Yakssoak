import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { injected } from "../lib/Connectors";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { TextField, FormLabel } from "@mui/joy";

import "./PhLoginForm.css";

export default function PhLoginForm() {
  const navigate = useNavigate();
  const { account, active, error, activate, deactivate } = useWeb3React();

  const [id, setId] = useState("");
  const [password, setPass] = useState("");

  function IdChange(e) {
    setId(e.target.value);
  }
  function PasswordChange(e) {
    setPass(e.target.value);
  }

  function Send() {
    console.log(id, password);
    //api 통해서 로그인 보내고 아이디 일치시
    activate(injected);
    navigate("/doc");
  }

  return (
    <div id="loginbox">
      <div class="login">
        <h1 className="loginTitle" style={{ color: "#00ADEF" }}>
          약국로그인
        </h1>
        <span style={{ fontSize: 15, marginTop: 10 }}>
          약쏙(전자처방전)을 이용하기 위해서는 회원가입이 필요합니다
        </span>
        <div style={{ marginTop: 30 }}>
          <FormLabel style={{ marginBottom: 5, fontWeight: "bold" }}>
            아이디
          </FormLabel>
          <TextField
            class="a"
            className="logInput"
            placeholder="아이디를 입력해주세요."
            onChange={IdChange}
          />
          <FormLabel
            style={{ marginTop: 10, marginBottom: 5, fontWeight: "bold" }}
          >
            비밀번호
          </FormLabel>
          <TextField
            class="a"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={PasswordChange}
          />
        </div>
        <button onClick={Send} id="loginbutton">
          로그인
        </button>
        <Link to="/" class="link">
          아이디/비밀번호 찾기
        </Link>
      </div>
      <div class="info">
        <img className="logoImg" src="img/001.png" alt="logo" />
        <div class="buttonbox">
          <Link to="/ph/signup">
            <button className="linkbutton">회원가입</button>
          </Link>
          <Link to="/">
            <button className="linkbutton">이용방법</button>
          </Link>
        </div>
      </div>
    </div>
  );
}