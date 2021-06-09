import { useHistory } from "react-router-dom";
import "../../router/testcomponent.style.css";
const Scores = (props) => {
  const history = useHistory();
  function handleClick() {
    history.push("/test-cpt");
  }
  return (
    <>
      <section className="sectionShowResult">
        <div className="container pt-5">
          <div className="row colorTitleSectionShowResult">
            <div className="offset-2 col-10 ">
              <h5 className="fontfa py-2 directionContentTable">
                Cpt نتیجه آزمون
              </h5>
            </div>
          </div>
        </div>
        <div className="container-fluid m-0">
          <div className="row mt-3 mb-3">
            <div className="offset-1 col-10 ">
              <table className="table table-hover table-striped table-responsive-sm borderTable">
                <tbody>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {props.score.totalNumber}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-21">
                        {" "}
                        تعداد کل ستارها{" "}
                      </h6>
                    </td>
                  </tr>
                  <tr className="backgroundTableResult">
                    <td>
                      <h6 className="directionResultTable p-1">
                        {props.score.allCorrects}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        {" "}
                        تعداد تمام ستارهای درست
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {props.score.userCorrects}
                      </h6>
                    </td>
                    <td>
                      <h6 className="directionContentTable fontfa p-1">
                        {" "}
                        تعداد ستارهای درست زده شده توسط کاربر
                      </h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6 className="directionResultTable p-1">
                        {props.score.responseAvg}
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
                        {props.score.ommission}
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
                        {props.score.commission}
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
  );
};
export default Scores;
