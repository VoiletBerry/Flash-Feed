import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  console.log(err);

  return (
    <div className="error">
      <div class="mainbox">
        <div className="digit">
          <div class="err">4</div>
          <i class="far fa-question-circle fa-spin"></i>
          <div class="err2">4</div>
        </div>
        <div class="msg">
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
          existed in the first place?
          <p>
            Let's go {"    "}
            <Link to="/" className="anchor">
              Home
            </Link>
            {"    "}and try from there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
