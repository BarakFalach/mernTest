import React, { Fragment, useState } from "react";
const LoginUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    gameKey: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
  };
  const { name, gameKey } = formData;
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
            placeholder='gameKey'
            name='gameKey'
            value={gameKey}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login'></input>
      </form>
    </Fragment>
  );
};

export default LoginUser;
