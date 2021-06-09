import React, { useState, useEffect, useRef } from "react";
import "../router/testcomponent.style.css";
import { useHistory } from "react-router-dom";
const Starttestgonogo = () => {
  let history = useHistory();
  const refResponse = useRef([]);
  const refSumResponseTime = useRef(0);
  const refAverageCorrectResponseTime = useRef(0);
  const refTargets = useRef([]);
  const refResults = useRef([]);
  const refReactions = useRef([]);
  const [currentTarget, setCurrentTarget] = useState("");
  const [spaces, setSpaces] = useState([]);
  const [feedback, setFeedback] = useState("");
  const refCount = useRef(0);
  const refStartTrial = useRef(null);
  const [totalInCorrect, setTotalInCorrect] = useState([]);
  const [totalCorrect, setTotalCorrect] = useState([]);
  const [correctdeterrent, setCorrectDeterrent] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [ommition, setOmmition] = useState([]);
  const [commition, setCommition] = useState([]);
  const refStetimeFaideShow = useRef();
  const refStetimeShow = useRef();

  let input = {
    t: 1000,
    isi: 1000,
    target: "پ",
    s: [
      "ب",
      "ب",
      "ت",
      "ث",
      "پ",
      "ب",
      "پ",
      "ب",
      "ب",
      "ت",
      "ث",
      "پ",
      "ب",
      "پ",
      null,
    ],
  };

  useEffect(() => {
    updateValueTest();
    start(refCount.current);
    computingTotalCorrect();
  }, []);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const updateValueTest = () => {
    for (const iterator of input.s) {
      refResponse.current.push(input.t + input.isi);
      refResults.current.push(false);
      refReactions.current.push(false);
      iterator === input.target
        ? refTargets.current.push(1)
        : refTargets.current.push(0);
    }
  };

  const computingTotalCorrect = () => {
    let idx = input.s.indexOf(input.target);
    while (idx != -1) {
      let tempTotalInCorrect = totalInCorrect;
      tempTotalInCorrect.push(idx);
      idx = input.s.indexOf(input.target, idx + 1);
      setTotalInCorrect(tempTotalInCorrect);
    }
  };

  const start = (cnt) => {
    setFeedback("");
    refCount.current = cnt;
    refStartTrial.current = Date.now();
    setCurrentTarget(input.s[cnt]);
    refStetimeFaideShow.current = setTimeout(() => {
      setCurrentTarget("");
    }, input.t);
    if (cnt < input.s.length - 1) {
      refStetimeShow.current = setTimeout(() => {
        start(cnt + 1);
      }, input.t + input.isi);
    } else {
      showResult();
    }
  };

  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      let timeSpace = Date.now();
      if (refResponse.current[refCount.current] === input.t + input.isi) {
        let tempSpaces = spaces;
        tempSpaces.push(timeSpace);
        setSpaces(tempSpaces);
        refResponse.current[refCount.current] =
          timeSpace - refStartTrial.current;
        if (refResponse.current[refCount.current] < input.t) {
          clearTimeout(refStetimeFaideShow.current);
          clearTimeout(refStetimeShow.current);
          setCurrentTarget("");
          let RemainedTime = input.t - refResponse.current[refCount.current];
          setTimeout(() => {
            start(refCount.current + 1);
          }, input.isi - RemainedTime);

          handleFeedback();
        } else {
          handleFeedback();
        }
      }
      refReactions.current[refCount.current] = true;
    }
  };

  const handleFeedback = () => {
    if (input.s[refCount.current] !== input.target) {
      setFeedback(true);
    } else {
      setFeedback(false);
    }
  };

  const showResult = () => {
    for (let index = 0; index < input.s.length; index++) {
      if (
        refTargets.current[index] === 0 &&
        refReactions.current[index] === true &&
        input.s[index] !== null
      ) {
        refResults.current[index] = "A";
        let tempCorrect = correct;
        tempCorrect.push(index);
        setCorrect(tempCorrect);
      }
      if (
        refTargets.current[index] === 1 &&
        refReactions.current[index] === false &&
        input.s[index] !== null
      ) {
        refResults.current[index] = "B";
      }
      if (
        refTargets.current[index] === 1 &&
        refReactions.current[index] === true &&
        input.s[index] !== null
      ) {
        refResults.current[index] = "C";
      }
      if (
        refTargets.current[index] === 0 &&
        refReactions.current[index] === false &&
        input.s[index] !== null
      ) {
        refResults.current[index] = "D";
      }
    }
    for (let index = 0; index < refResults.current.length; index++) {
      if (refResults.current[index] === "B" && input.s[index] !== null) {
        let tempCorrectDeterrent = correctdeterrent;
        tempCorrectDeterrent.push(index);
        setCorrectDeterrent(tempCorrectDeterrent);
      }
      if (refResults.current[index] === "D" && input.s[index] !== null) {
        let tempOmmition = ommition;
        tempOmmition.push(index);
        setOmmition(tempOmmition);
      }
      if (refResults.current[index] === "C" && input.s[index] !== null) {
        let tempCommition = commition;
        tempCommition.push(index);
        setCommition(tempCommition);
      }
      if (
        refResults.current[index] === "A" ||
        (refResults.current[index] === "D" && input.s[index] !== null)
      ) {
        let tempTotalCorrect = totalCorrect;
        tempTotalCorrect.push(index);
        setTotalCorrect(tempTotalCorrect);
      }
    }
    let SumCorrectResponseTime = correct.map((item) => {
      return refResponse.current[item];
    });
    refSumResponseTime.current = SumCorrectResponseTime.reduce(
      (a, b) => a + b,
      0
    );
    if (correct.length !== 0) {
      refAverageCorrectResponseTime.current =
        refSumResponseTime.current / correct.length;
    }
  };

  function handleClick() {
    history.push("/testgo-no-go");
  }

  return (
    <>
      {refCount.current <= input.s.length - 2 ? (
        <>
          <section className="sectionShowNumber">
            <div className="container">
              <div className="row featureRow">
                <div className="offset-2 col-8">
                  <div className="jumbotron featurejumbotron">
                    <div className="container">
                      <div className="fontfa">
                        <p className="text">{currentTarget}</p>
                      </div>
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
                    {feedback === true ? (
                      <>
                        <h1>درست</h1>
                      </>
                    ) : feedback === false ? (
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
      ) : refCount.current === input.s.length - 1 ? (
        <>
          <section className="sectionShowResult">
            <div className="container pt-5">
              <div className="row colorTitleSectionShowResult">
                <div className="offset-2 col-10 ">
                  <h5 className="fontfa py-2 directionContentTable">
                    نتیجه آزمون برو نرو
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
                            {input.s.length - 1}
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
                            {totalCorrect.length}
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
                            {totalInCorrect.length}
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
                            {correctdeterrent.length}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            بازداری صحیح{" "}
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
                            {refSumResponseTime.current}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            زمان پاسخ صحیح{" "}
                          </h6>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="directionResultTable p-1">
                            {refAverageCorrectResponseTime.current}
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
                            {ommition.length}
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
                            {commition.length}
                          </h6>
                        </td>
                        <td>
                          <h6 className="directionContentTable fontfa p-1">
                            {" "}
                            خطای ارتکاب (commition){" "}
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
                      شروع مجدد آزمون
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

export default Starttestgonogo;
