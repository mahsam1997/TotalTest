import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../router/testcomponent.style.css";

const Starttestnback = () => {
  const history = useHistory();
  const [number, setNumber] = useState(-1);
  const [StateNumberTest] = useState([1, 2, 2, 3, 3, 8, 5, null]);
  const [isToggled, setIsToggled] = useState(true);
  const [mode, setMode] = useState();
  const [spaces, setSpaces] = useState([]);
  const [totalcorrect, setTotalCorrect] = useState([]);
  const [totalincorrect, setTotalinCorrect] = useState();
  const [correct, setNumberCorrect] = useState([]);
  const [incorrect, setNumberInCorrect] = useState([]);
  const [ommision, setOmmision] = useState(0);
  const [timeresponse, setTimeResponse] = useState([]);
  const [time, setTime] = useState([]);
  const [finaltimeresponse, setFianlTimeResponse] = useState(0);

  let startTime = null;
  let input = {
    t: 2000,
    isi: 2000,
    n: 1,
  };

  useEffect(() => {
    start();
  }, []);
  useEffect(() => {
    window.addEventListener("keypress", handleUserKeyPress);
    return () => {
      window.removeEventListener("keypress", handleUserKeyPress);
    };
  }, []);

  const start = () => {
    let duplicates = totalcorrect;
    for (let i = 0; i < StateNumberTest.length; i++) {
      if (StateNumberTest[i + input.n] === StateNumberTest[i]) {
        duplicates.push(StateNumberTest[i]);
      }
    }
    setTotalCorrect(duplicates);

    let totalincorrect = StateNumberTest.length - 1 - totalcorrect.length;
    setTotalinCorrect(totalincorrect);

    startTime = Date.now();
    let count = -1;
    let Timer = setInterval(function () {
      if (count < StateNumberTest.length - 1) {
        setMode("");
        setIsToggled(true);
        setTimeout(() => {
          setIsToggled(false);
        }, input.t);
        count++;
        setNumber(count);
      } else {
        clearInterval(Timer);
        showResult();
      }
    }, input.isi + input.t);
  };

  const handleUserKeyPress = (event) => {
    if (event.code === "Space") {
      const GetTimeSpace = Date.now();
      if (spaces.length <= 0) {
        let temp = spaces;
        temp.push(GetTimeSpace);
        setSpaces(temp);
        handleFeedback();
      } else {
        const lastItemSpaces = spaces[spaces.length - 1];
        const passedTime = (startTime - GetTimeSpace) * -1;
        const currentSlot = Math.floor(passedTime / (input.isi + input.t));
        const lastSpace = (startTime - lastItemSpaces) * -1;
        const lastSpaceSlot = Math.floor(lastSpace / (input.isi + input.t));
        if (currentSlot !== lastSpaceSlot) {
          let temp = spaces;
          temp.push(GetTimeSpace);
          setSpaces(temp);
          handleFeedback(currentSlot);
        }
      }
    }
  };

  const handleFeedback = (currentSlot = 1) => {
    let c = StateNumberTest[currentSlot - 1];
    let n = input.n;
    let l = currentSlot - 1 - n;

    if (c === StateNumberTest[l]) {
      setMode(true);

      let arrayCorrectTime = timeresponse;
      let lastSpace = spaces[spaces.length - 1];
      arrayCorrectTime.push(lastSpace);
      setTimeResponse(arrayCorrectTime);

      let numberCorrect = correct;
      numberCorrect.push(currentSlot);
      setNumberCorrect(numberCorrect);
    } else {
      setMode(false);

      let numberinCorrect = incorrect;
      numberinCorrect.push(currentSlot);
      setNumberInCorrect(numberinCorrect);
    }
  };

  const showResult = () => {
    let omision = totalcorrect.length - correct.length;
    setOmmision(omision);

    let slotCorrect = correct.map((item) => {
      return startTime + item * (input.isi + input.t);
    });
    for (let i = 0; i < slotCorrect.length; i++) {
      let averagetimeresponse = timeresponse[i] - slotCorrect[i];
      let times = time;
      times.push(averagetimeresponse);
      setTime(times);
    }
    if (correct.length !== 0) {
      let sub = time.reduce((a, b) => a + b, 0);
      let averageTime = sub / correct.length;
      setFianlTimeResponse(averageTime);
    }
  };

  function handleClick() {
    history.push("/testN-back");
  }

  return (
    <>
      {number < 7 ? (
        <>
          <section className="sectionShowNumber">
            <div className="container">
              <div className="row featureRow">
                <div className="offset-2 col-8">
                  <div
                    className="jumbotron featurejumbotron"
                    style={{ height: "20rem" }}
                  >
                    <div className="container d-flex justify-content-center">
                      {isToggled === true ? (
                        <>
                          {number > -1 && number < 8 ? (
                            <>
                              <div
                                className=" col-md-2 py-4 col-4 fonten"
                                style={{
                                  fontSize:"1rem",
                                  backgroundColor: "blue",
                                  textAlign: "center",
                                  color: "white",
                                  marginTop: "4rem",
                                }}
                              >
                                {StateNumberTest[number]}
                              </div>
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="showFeedback">
            <div className="container d-flex justify-content-center">
              <div className="row">
                <div className="my-5">
                  <div className="fontfa alignFeedback">
                    {mode === true ? (
                      <>
                        <h1>درست</h1>
                      </>
                    ) : mode === false ? (
                      <>
                        <h1>غلط</h1>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : number === 7 ? (
        <>
          <section className="sectionShowResult">
            <div className="container pt-5">
              <div className="row colorTitleSectionShowResult">
                <div className="offset-2 col-10 ">
                  <h5 className="fontfa py-2 directionContentTable">
                    N-back نتیجه آزمون
                  </h5>
                </div>
              </div>
            </div>
            <div className="container-fluid ">
              <div className="row mt-3 mb-3">
                <div className="offset-1 col-10">
                  <table className="table table-hover table-striped table-responsive-sm borderTable">
                    <tbody>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {StateNumberTest.length - 1}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-21">
                            {" "}
                            تعداد محرک‌ها{" "}
                          </h6>
                        </td>
                      </tr>
                      <tr className="backgroundTableResult">
                        <td>
                          <h6 className="directionResultTable p-1">
                            {input.t}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            زمان نمایش محرک‌ها
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {input.isi}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            زمان بین محرک‌ها
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {totalcorrect.length}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            تعداد کل پاسخ صحیح
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {totalincorrect}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            تعداد کل پاسخ غلط
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {correct.length}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            پاسخ صحیح{" "}
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {finaltimeresponse} ms
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            میانگین زمان پاسخ صحیح{" "}
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {ommision}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            خطای حذف(ommition){" "}
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {incorrect.length}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            خطای ارتکاب (commition){" "}
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {ommision + incorrect.length}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            تمام خطاهای کاربر (commision+ommision){" "}
                          </h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container d-flex justify-content-center">
                    <button
                      className="btn btn-primary btn-lg col-md-2 col-4 my-3 fontfa"
                      type="button"
                      onClick={handleClick}
                    >
                      <p>شروع مجدد آزمون</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
};
export default Starttestnback;
