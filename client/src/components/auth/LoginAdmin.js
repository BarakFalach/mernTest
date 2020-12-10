import React, {Fragment, useState} from 'react'
import { Link , Redirect} from 'react-router-dom'
import axios from 'axios';



const LoginAdmin = () => {
    

    const [adminLogedIn, setAdminLoged] = useState (
        false
    )

    const [formData, setDataForm] = useState({
        email: "",
        password: ""
    })
    
    const [mainAdmin,setMainAdmin] = useState()

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
            //setMainAdmin (tempAdmin.data);
            //setAdminLoged(true);
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
        <Fragment>
            
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link
            href="https://fonts.googleapis.com/css?family=Raleway"
            rel="stylesheet"
            />
            <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
            integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
            crossorigin="anonymous"
            />

            <link rel="stylesheet" href="css/style.css" />
            <title>Welcome To The Developer Connector</title>
        </head>
        <body>
    {/* {   adminLogedIn?
                    <Link 
                        to= {{
                            pathname: '/admin' ,
                            state: {admin: mainAdmin},
                            onlyActiveOnIndex: adminLogedIn}}> 
                        <button>{mainAdmin.name}</button>        
                    </Link>: 
                    <button>{}</button>} */}
            <section class="container">
            <h1 class="large text-primary">
                Sign In
            </h1>

                <div class="form-group">
                    <input 
                        type="text"
                        // barakfalah8995@gmail.com
                        placeholder="Email Address"
                        name="email" 
                        value={email}
                        onChange = {e => onChange(e)}
                        required/>
                </div>

                <div class="form-group">
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
                            class="btn sign_in"
                            onClick=  {e => Login(e)} >
                            sign in
                        </button>       
                </div>
                    

                <div class="message create account">
                    <h5>
                        Don't have an account yet?
                    </h5>
                </div>

                <div class="sign Up">
                    <button type="button" class="btn sign Up">
                        sign up
                    </button>
                </div>

                
            </section>
        </body>
        </html>
        </Fragment>

    )
}

export default LoginAdmin
