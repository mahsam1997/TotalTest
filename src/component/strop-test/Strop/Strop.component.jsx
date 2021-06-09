import React, { useState, useEffect } from "react";
import StropShow from "../StropShow/StropShow.component";
import StropScore from "../StropScore/StropScore.component";


const Strop = (props) => {
  const [sample, setSample] = useState({ p: "", color: "" });
  const [timeShow, setTimeShow] = useState([]);
  const [feedback, setFeedback] = useState();
  const [responseTime, setResponseTime] = useState([]);
  const [typeSample, setTypeSample] = useState([]);
  const [trueFalse, setTrueFalse] = useState([]);
  const [done, setDone] = useState(false);
  const asciiCode = props.ascii;
  let spaces = [];
  let i = 0;
  let tempClear;
  let time = props.isi + props.t + props.fixed;
  let timeFixed;
  let myisi;
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);
  useEffect(() => {
    show();
  }, []);
  const showSample = () => {
    setSample({ p: props.data[i].text, color: props.data[i].color });
    let timeShowText = Date.now();
    let temp = timeShow;
    temp.push(timeShowText);
    setTimeShow(temp);
    let tempType = typeSample;
    tempType.push(props.data[i].type);
    setTypeSample(tempType);
  };

  const showIsi = () => {
    console.log("isi");
    setSample({ p: " ", color: "black" });
    i++;
  };

  const interval = () => {
    if (i < props.data.length) {
      setFeedback("");
      setSample({ p: "+", color: "white" });
      timeFixed = Date.now();
      let tempResponse = responseTime;
      let tempResponseTime = props.t + props.isi;
      tempResponse.push(tempResponseTime);
      setResponseTime(tempResponse);
      let tempTrueFalse = trueFalse;
      tempTrueFalse.push("none");
      setTrueFalse(tempTrueFalse);
      spaces.push(0);
      setTimeout(showSample, props.fixed);
      myisi = setTimeout(showIsi, props.t + props.fixed);
    } else {
      intervalClear();
      setDone(true);
    }
  };
  const show = () => {
    interval();
    tempClear = setInterval(interval, time);
  };
  const intervalClear = () => {
    clearInterval(tempClear);
  };
  const handleKey = (event) => {
    let temp = Date.now();
    let cnt;
    let sw = false;
    if (spaces[spaces.length - 1] === 0)
      if (temp - timeFixed > props.fixed) {
        for (cnt = 0; cnt < asciiCode.length; cnt++) {
          if (
            props.data[timeShow.length - 1].nameColor === asciiCode[cnt].keyName
          ) {
            sw = true;
            break;
          }
        }
        if (sw) {
          temp = Date.now();
          if (
            event.keyCode === asciiCode[cnt].codeE ||
            event.keyCode === asciiCode[cnt].codeF
          ) {
            let tempResponseTime = temp - timeShow[timeShow.length - 1];
            let tempResponse = responseTime;
            let tempTrueFalse = trueFalse;
            tempTrueFalse[tempTrueFalse.length - 1] = "T";
            setTrueFalse(tempTrueFalse);
            tempResponse.push(tempResponseTime);
            setResponseTime(tempResponse);
            spaces[spaces.length - 1] = 1;
            setFeedback("آفرین درست انتخاب کردی");
            if (temp - timeFixed < props.fixed + props.t) {
              clearTimeout(myisi);
              showIsi();
              intervalClear();
              setTimeout(() => {
                show();
              }, props.isi);
            }
          } else {
            let findKey = false;
            for (let i_ascii = 0; i_ascii < asciiCode.length; i_ascii++)
              if (
                event.keyCode === asciiCode[i_ascii].codeE ||
                event.keyCode === asciiCode[i_ascii].codeF
              ) {
                findKey = true;
                break;
              }
            if (findKey) {
              setFeedback("متاسفم اشتباه انتخاب کردی");
              spaces[spaces.length - 1] = 1;
              let tempResponseTime = temp - timeShow[timeShow.length - 1];
              let tempResponse = responseTime;
              tempResponse.push(tempResponseTime);
              setResponseTime(tempResponse);
              let tempTrueFalse = trueFalse;
              tempTrueFalse[tempTrueFalse.length - 1] = "F";
              setTrueFalse(tempTrueFalse);
              if (temp - timeFixed < props.fixed + props.t) {
                clearTimeout(myisi);
                showIsi();
                intervalClear();
                setTimeout(() => {
                  show();
                }, props.isi);
              }
            } else {
              console.log("معتبر نیست");
            }
          }
        }
      }
  };

  return (
    <>
      {done === false ? (
        <StropShow sample={sample} showReaction={feedback} />
      ) : (
        <StropScore
          typeSample={typeSample}
          trueFalse={trueFalse}
          responseTime={responseTime}
          timeIsi={props.isi}
          timeT={props.t}
        />
      )}
    </>
  );
};
export default Strop;
