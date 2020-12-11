import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("SUCCESS");
  };
  const { email, password } = formData;
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='formField'
            type='text'
            placeholder='Email Adress'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='formField'
            type='password'
            placeholder='* Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login'></input>
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </Fragment>
  );
};

export default LoginAdmin;
