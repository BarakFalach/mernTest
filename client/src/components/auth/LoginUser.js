import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { UserLogin } from "../../actions/user";
import { Question } from "../game/Question";
// import Game from "../game/Game";

const LoginUser = ({ UserLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    keygame: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    UserLogin({ name, keygame });
  };

  if (isAuthenticated) {
    console.log("user - isAuthenticated");
    return <Question />;
    // return <Game />;
  }

  const { name, keygame } = formData;
  return (
    <Fragment>
      <h1 className='large text-primary'>User Interface</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
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
          <input
            className='formField'
            type='number'
            placeholder='keygame'
            name='keygame'
            value={keygame}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login'></input>
      </form>
    </Fragment>
  );
};

LoginUser.propTypes = {
  isAuthenticated: PropTypes.bool,
  UserLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { UserLogin })(LoginUser);
