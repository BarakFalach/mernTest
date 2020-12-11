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
      const newAdmin = {
        name,
        email,
        password,
      };
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(newAdmin);
        const res = await axios.post("/api/admin", body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  const { name, email, password, password2 } = formData;
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
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
    </Fragment>
  );
};

export default Register;
