import React from "react";
import { Link } from "react-router-dom";
import "./DocNavbar.css";
import logo from "./img/001.png";

export default function DocNavbar() {
  return (
    <div id="nav">
      <div>
        {/* <img style={{ height: 100 }} src={logo} alt="로고" />
        <img src={logo} alt="" /> */}
        <img src={process.env.PUBLIC_URL + '/img/001.png'} alt="" />
      </div>
      <div>
        <Link to="/doc/generate">처방전 생성</Link>
        <Link to="/doc/log">처방전 조회</Link>
        <Link to="/doc/">마이페이지</Link>
      </div>
    </div>
  );
}