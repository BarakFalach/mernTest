import React, { Fragment, useState } from "react";
import axios from "axios";

const Register = () => {
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
      console.log("Passwords do not match");
    } else {
        console.log("SUCCESS");
      };
  const { name, email, password, password2 } = formData;
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
            required
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
            minLength='6'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='formField'
            type='password'
            placeholder='* Password2'
            name='password2'
            value={password2}
            minLength='6'
            onChange={(e) => onChange(e)}
            required
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

export default Register;
