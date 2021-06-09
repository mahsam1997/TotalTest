import "@fontsource/roboto/500.css";
import imglogo from "../router/imgcomponentrouter/logo.png";
import Starttestgonogo from "../gonogo-test/starttest.component";
import GonogoTest from "../gonogo-test/test.component";
import NbackTest from "../nback-test/test.component";
import Starttestnback from "../nback-test/starttest.component";
import StropTest from "../strop-test/Strop/testbutton.component";
import SetDataStrop from "../strop-test/SetDataStrop/SetDataStrop.component";
import CptTest from "../cpt-test/cpt/button.component";
import CPT from "../cpt-test/cpt/CPT.component";
import "../router/testcomponent.style.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const MenuTest = () => {
  const Home = () => {
    return (
      <>
        <section className="sectionMenu">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <a className="navbar-brand" href="#">
                    <img
                      src={imglogo}
                      className="img-fluid pl-md-5 pl-sm-2 "
                      alt="collection1"
                    />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="mr-auto"></ul>
                    <li className=" navbar-nav nav-item active px-5 alignmenu py-3">
                      <Link to="/test-cpt" className="linkstyle fonten  m-2">
                        <h5>Cpt</h5>
                      </Link>
                      <Link to="/test-strop" className="linkstyle fonten  m-2">
                        <h5>Strop</h5>
                      </Link>
                      <Link to="/testgo-no-go" className="linkstyle fonten m-2">
                        <h5>GO-NO-GO</h5>
                      </Link>
                      <Link to="/testN-back" className="linkstyle fonten  m-2">
                        <h5>N-back</h5>
                      </Link>
                    </li>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <Router>
      <Switch>
        <Route path="/starttest-cpt">
          <CPT />
        </Route>
        <Route path="/test-cpt">
          <CptTest />
        </Route>
        <Route path="/starttest-strop">
          <SetDataStrop />
        </Route>
        <Route path="/test-strop">
          <StropTest />
        </Route>
        <Route path="/starttest-n-back">
          <Starttestnback />
        </Route>
        <Route path="/testN-back">
          <NbackTest />
        </Route>
        <Route path="/starttest-go-no-go">
          <Starttestgonogo />
        </Route>
        <Route path="/testgo-no-go">
          <GonogoTest />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
export default MenuTest;
