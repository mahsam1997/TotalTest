import "../../router/testcomponent.style.css";
import { Link } from "react-router-dom";
const StropTest = () => {
  return (
    <>
      <section className="sectionStartTest">
        <div className="container">
          <div className="row featureRow">
            <div className="offset-2 col-8">
              <div className="jumbotron featurejumbotron">
                <div className="container">
                  <div className="fontfa">
                    <p className="text">
                      <button
                        className="btn btn-primary col-md-8 col-7 py-3"
                        type="button"
                      >
                        <Link to="/starttest-strop" className="linkstyle">
                          <h5>شروع آزمون</h5>
                        </Link>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default StropTest;
