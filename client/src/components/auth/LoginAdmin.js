import React, {Fragment, useState} from 'react'
import { Link , Redirect} from 'react-router-dom'
import axios from 'axios';



const LoginAdmin = () => {
    


    const [formData, setDataForm] = useState({
        email: "",
        password: ""
    })
    

    const {email, password} = formData;
    

    const onChange = e => setDataForm({...formData, [e.target.name]: e.target.value});
    const Login = async e => {
        e.preventDefault(); 
        var res ;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        
            const body = JSON.stringify(formData);    
            res = await axios.post('/api/auth', body, config);
            console.log(res.data.token);

        } catch (err){
            console.log("Error falah");
            throw err;
        }

        try {
            const config = {
                headers: {
                    'x-auth-token': res.data.token
                }
            }
            const tempAdmin = await axios.get('/api/auth', config);

            return <Redirect 
                        to= {{
                            pathname: '/admin' ,
                            state: {admin: tempAdmin}
                            }}></Redirect>
        } catch (err){
            console.log("Error Asi");
            throw err;
        }
    }

    
    return (
        // <Fragment>
            
        
        <body>
          {/* <section className="container"> */}
            <h1 className="large text-primary">
                Sign In
            </h1>
            <div className="form-group">
              <input 
                type="text"
                // barakfalah8995@gmail.com
                placeholder="Email Address"
                name="email" 
                value={email}
                onChange = {e => onChange(e)}
                required/>
            </div>
            <div className="form-group">
              <input 
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange = {e => onChange(e)} 
                required />
            </div>
            <div>
              <button 
                type="button" 
                className="btn sign_in"
                onClick=  {e => Login(e)}>
                sign in
              </button>       
            </div>
            <div className="message create account">
              <h5>
                  Don't have an account yet?
              </h5>
            </div>
            <div className="sign Up">
              <button 
                type="button" 
                className="btn sign Up">
                sign up
              </button>
            </div>
          {/* </section> */}
        </body>
        // </Fragment>

    )
}

export default LoginAdmin
