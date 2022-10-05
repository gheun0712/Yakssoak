import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./DocSignup.css";
import { Checkbox } from "@mui/joy";

export default function Signup1(props) {
  const [check, setCheck] = useState(false);
  function Next() {
    if (check) {
      props.setStep(2);
    } else {
      alert("약관에 동의해 주세요");
    }
  }

  return (
    <div className="signBox">
      <div className="textBox">
        <h4 style={{ fontWeight: "bold" }}>[이용약관]</h4>
        <p style={{ marginTop: 8, marginLeft: 10 }}>
          약관을 읽으신 후 동의 여부를 체크해 주세요.
        </p>
      </div>
      <div className="termsBox">이용약관 내용</div>
      <div className="checkBox">
        <Checkbox
          label="이용약관에 동의하면 여기를 <클릭>해주세요."
          color="neutral"
          size="md"
          variant="outlined"
          onClick={()=>{setCheck(!check)}}
        />
      </div>
      <div className="buttonBox">
        <Link to="/">
          <button
            className="docbutton"
            style={{ color: "#5681EF", backgroundColor: "transparent" }}
          >
            동의안함
          </button>
        </Link>
        <button
          className="docbutton"
          style={{ color: "#5681EF", backgroundColor: "transparent" }}
          onClick={Next}
        >
          다음으로
        </button>
      </div>
    </div>
  );
}