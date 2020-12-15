import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, raiseScore } from "../../actions/user";

const LoginUser = ({ login, isAuthenticated, raiseScore }) => {
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

  const onSubmitScore = async () => {
    raiseScore(10);
  };

  if (isAuthenticated) {
    console.log("user - isAuthenticated");
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
      <button className="raiseScore" on onClick={() => onSubmitScore()}> Press to Raise Score in 10 points</button>
    </Fragment>
  );
};

LoginUser.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, raiseScore })(LoginUser);
