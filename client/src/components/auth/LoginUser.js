import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/user";
import { Redirect } from "react-router-dom";
import { loadState } from "../../localStorage";
import "../layouts/css/LoginUser.css";
const LoginUser = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    gameKey: "",
  });

  useEffect(() => {
    var load = loadState();
    console.log(load);

    if (load != undefined) {
      login({ number: load.number, gameKey: load.gameKey });
    }
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("key game is " + gameKey);
    login({ gameKey });
  };

  if (isAuthenticated) {
    return <Redirect to="/game" />;
  }

  const { gameKey } = formData;
  return (
    <Fragment>
      <div className="flex-container-user-main ">
        <h2>ברוכים הבאים </h2>
        <h2 style={{ marginTop: "2%" }}>
          בשלב הראשון, אנא מלאו את שמכם המלא ואת קוד המשחק הניתן לכם על ידי
          המנחה{" "}
        </h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div style={{ marginTop: "10%" }}>
            <input
              type="text"
              placeholder="קוד משחק"
              name="gameKey"
              textAlign="middle"
              value={gameKey}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div style={{ marginTop: "15%" }}>
            <button type="submit" color="primary">
              היכנס/י
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

LoginUser.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginUser);
