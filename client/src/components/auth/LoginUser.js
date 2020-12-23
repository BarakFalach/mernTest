import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/user";
import WaitingRoom from "../layouts/WaitingRoom";
import { DialogTitle, Typography, TextField } from "@material-ui/core";
import Game from "../game/Game";
import Question from "../game/Question";

const LoginUser = ({ login, isAuthenticated, questions }) => {
  const [formData, setFormData] = useState({
    name: "",
    keygame: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("key game is " + keygame);
    login({ name, keygame });
  };

  if (questions.length > 0) {
    console.log("Login User Got THe Question");
    return <Question />;
  }

  if (isAuthenticated) {
    console.log("user - isAuthenticated");
    return <Game />;
  }

  const { name, keygame } = formData;
  return (
    <Fragment>
      <Typography variant='h2' color='primary'>
        User Interface
      </Typography>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <TextField
            className='formField'
            type='text'
            placeholder='Full Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <TextField
            className='formField'
            type='number'
            placeholder='keygame'
            name='keygame'
            value={keygame}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <TextField
          type='submit'
          className='btn btn-primary'
          value='Login'
        ></TextField>
      </form>
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
