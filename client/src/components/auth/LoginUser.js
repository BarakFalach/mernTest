import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/user";
import { DialogTitle, Typography, TextField, Button } from "@material-ui/core";
import Game from "../game/Game";
import { Redirect } from "react-router-dom";

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

  if (isAuthenticated) {
    return <Redirect to='/game' />;
  }

  const { name, keygame } = formData;
  return (
    <Fragment>
      <Typography variant='h2'>User Interface</Typography>
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
        <div>
          <Button type='submit' className='btn btn-primary' color='primary'>
            Login
          </Button>
        </div>
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
