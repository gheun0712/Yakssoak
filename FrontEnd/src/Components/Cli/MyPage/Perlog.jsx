import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { abi, nftCA } from "../../../web3Config";

export default function Perlog(props) {

  const[selected,setSelected] = useState('')

  const list = props.list.map((yak,idx) => (
    <div
      style={{
        borderBottom: "solid 2px #5681EF",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ margin: "10px 0px 10px 25px" }}>
        <div
          style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "10px" }}
        >
          {yak[1]}
        </div>
        <div>발행일 :　{yak.pubDate}</div>
        <div
          style={{ margintTop: "15px" }}
          className={yak.prescriptionCount === "1" ? "short" : "long"}
        >
          {yak.prescriptionCount === "1" ? "단기" : "정기"}
        </div>
      </div>
      <button id="bluebutton" onClick={()=>{setSelected(idx)}} style={{ margin: "40px 10px 10px 0px" }}>
        상세내역
      </button>
      <div>
        {selected===idx ? 
        <div>
          <div>{yak.dName.map((x,idx)=><div>
            <div>약이름 : {x}</div>
            <div>투약량 : {yak.dosage[idx]}</div>
            <div>횟수 : {yak.doseNum[idx]}</div>
            <div>투약일 :{yak.dosePeriod[idx]}</div>
            <div>용법 :{yak.howtoTake[idx]}</div>
            </div>)}
          </div>
          <button onClick={()=>{setSelected('')}}>닫기</button>
        </div>
        :
        ''}
      </div>
    </div>
    )
  );

  useEffect(() => {
    console.log(props.list, "처방이력페이지");
    console.log(props.list[0][1]);
  }, []);

  return (
    <div>
      <div className="myBox">
        <div>{list}</div>
      </div>
    </div>
  );
}
