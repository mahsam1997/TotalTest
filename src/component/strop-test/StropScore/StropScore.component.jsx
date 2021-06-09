import "../../router/testcomponent.style.css";
import { useHistory } from "react-router-dom";
const StropScore = (props) => {
  let history = useHistory();
  let numberObject = props.typeSample.length;
  let congTime = 0;
  let numberCong = 0;
  let incongTime = 0;
  let numberIncong = 0;
  let avgCongTime = 0;
  let avgIncongTime = 0;
  let sumResponse = 0;
  let falseCong = 0;
  let falseIncong = 0;
  let noAnswerCong = 0;
  let noAnswerIncong = 0;
  let interferenceScore = 0;
  let totalFalse = 0;
  const computeScore = () => {
    for (let j = 0; j < numberObject; j++) {
      if (props.typeSample[j] == "cong") {
        if (props.trueFalse[j] == "T") {
          congTime += props.responseTime[j];
        } else if (props.trueFalse[j] === "F") {
          falseCong++;
        } else if (props.trueFalse[j] === "none") {
          noAnswerCong++;
        }
        numberCong++;
      } else {
        if (props.trueFalse[j] === "T") {
          incongTime += props.responseTime[j];
        } else if (props.trueFalse[j] === "F") {
          falseIncong++;
        } else if (props.trueFalse[j] === "none") {
          noAnswerIncong++;
        }
        numberIncong++;
      }
    }
    if (congTime) avgCongTime = congTime / numberCong;
    if (incongTime) avgIncongTime = incongTime / numberIncong;

    sumResponse = congTime + incongTime;
    interferenceScore = avgIncongTime - avgCongTime;
    totalFalse = falseCong + falseIncong + noAnswerCong + noAnswerIncong;
    falseIncong += noAnswerIncong;
    falseCong += noAnswerCong;
  };

  computeScore();
  function handleClick() {
    history.push("/test-strop");
  }
  return (
    <>
      <section className="sectionShowResult">
        <div className="container pt-5">
          <div className="row colorTitleSectionShowResult">
            <div className="offset-2 col-10 ">
              <h5 className="fontfa py-2 directionContentTable">
              Strop نتیجه آزمون 
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
                        {numberObject}
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
                        {props.timeT}
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
                        {props.timeIsi}
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
                      <h6 className="directionResultTable p-1">{congTime}</h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        {" "}
                        مجموع پاسخ به محرک های همخوان
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {avgCongTime}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        {" "}
                        میانگین زمان پاسخ به محرک های همخوان
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">{incongTime}</h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        مجموع پاسخ به محرک های ناهمخوان
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {avgIncongTime}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        میانگین زمان پاسخ به محرک های ناهمخوان
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">{totalFalse}</h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        تعداد پاسخ غلط
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {sumResponse}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        مجموع زمان پاسخ
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {interferenceScore}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        نمره تداخل
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">{falseCong}</h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        تعداد خطا در محرک همخوان
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {falseIncong}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        تعداد خطا در محرک ناهمخوان
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {noAnswerCong}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        تعداد بدون پاسخ همخوان{" "}
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {noAnswerIncong}{" "}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        تعداد بدون پاسخ ناهمخوان{" "}
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
  );
};
export default StropScore;
