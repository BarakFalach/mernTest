import React, { Fragment, useState } from "react";
import DribbleButton from "react-dribble-button";

const LoginAdmin = () => {
  const [formData, setDataForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setDataForm({ ...formData, [e.target.name]: e.target.value });
  const onLogin = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign In</h1>
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

        <div id='Sign_In_Button'>
          <DribbleButton
            className='AnimateButton'
            color='deep-orange'
            animationDuration={1000}
          >
            <div className='LogInText'>התחבר</div>
          </DribbleButton>
        </div>

        <div id='sign_Up_Button'>
          <DribbleButton
            className='AnimateButton'
            color='yellow'
            animationDuration={1000}
          >
            הרשם
          </DribbleButton>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginAdmin;
