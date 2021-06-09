const StropShow = (props) => {
  return (
    <>
      <div className="container-fluid" style={{ background: "black" }}>
        <div className="row" style={{ height: "720px" }}>
          <div className="col-12  d-flex align-items-center justify-content-center">
            <h1
              style={{
                textAlign: "center",
                fontSize: 100,
                color: `${props.sample.color}`,
              }}
            >
              {props.sample.p}
            </h1>
          </div>
          {props.showReaction != " " ? (
            <div className="col-12 d-flex justify-content-center">
              <h4 className="text-center" style={{ color: "white" }}>
                {props.showReaction}
              </h4>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default StropShow;
