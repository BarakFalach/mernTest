import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      //third argument is time - optional.
      setAlert("Passwords do not macth", "danger");
    } else {
      register({ name, email, password });
    }
  };
  const { name, email, password, password2 } = formData;

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='formField'
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            className='formField'
            type='text'
            placeholder='Email Adress'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            className='formField'
            type='password'
            placeholder='* Password'
            name='password'
            value={password}
            minLength='6'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            className='formField'
            type='password'
            placeholder='* Password2'
            name='password2'
            value={password2}
            //minLength='6'
            onChange={(e) => onChange(e)}
            //required
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value='Register'
        ></input>
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/LoginAdmin'>Login</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
