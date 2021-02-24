import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/user";
import { DialogTitle, Typography, TextField, Button } from "@material-ui/core";
import { loadState } from "../../localStorage.js";
import { Redirect } from "react-router-dom";
import "../layouts/css/LoginUser.css";
const LoginUser = ({ login, isAuthenticated, questions }) => {
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

  const { name, gameKey } = formData;
  return (
    <Fragment>
      <div className="flex-container-user-main ">
        <Typography variant="h2">ברוכים הבאים </Typography>
        <Typography style={{ marginTop: "2%" }} variant="h8">
          בשלב הראשון, אנא מלאו את קוד המשחק הניתן לכם על ידי המנחה{" "}
        </Typography>

        <form onSubmit={(e) => onSubmit(e)}>
          <div style={{ marginTop: "10%" }}>
            <TextField
              className="formField"
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
            <Button id="testbutton" type="submit" color="primary">
              היכנס/י
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

LoginUser.propTypes = {
  isAuthenticated: PropTypes.bool,
  questions: PropTypes.array,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  questions: state.user.questions,
});

export default connect(mapStateToProps, { login })(LoginUser);
