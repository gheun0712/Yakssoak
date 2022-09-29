import { borderLeft } from "@mui/system";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./PhSignup.css";

export default function Signup3() {
  return (
    <div className="signBox" style={{ textAlign: "center", marginTop: 150 }}>
      <p className="successTitle">가입이 완료 되었습니다</p>
      <p className="subTitle">약쏙을 시작해 보세요</p>
      <div style={{ marginTop: 80 }}>
        <Link to="/doc/login">
          <button
            className="button"
            style={{
              borderColor: "transparent",
              backgroundColor: "#00ADEF",
              width: 400,
              height: 50,
              fontSize: 25,
            }}
          >
            로그인
          </button>
        </Link>
      </div>
      <div style={{ marginTop: 40 }}>
        <Link to="">
          <button
            className="button"
            style={{
              borderColor: "transparent",
              width: 400,
              height: 50,
              fontSize: 25,
            }}
          >
            의사 가이드
          </button>
        </Link>
      </div>
    </div>
  );
}