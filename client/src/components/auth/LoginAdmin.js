import React, {Fragment, useState} from 'react'
import axios from 'axios';
import DribbleButton from 'react-dribble-button';
import styles from './EdenCss.css';



const LoginAdmin = () => {

    const [formData, setDataForm] = useState({
        email: "",
        password: ""
    }) 

    const {email, password} = formData;

    const onChange = e => setDataForm({...formData, [e.target.name]: e.target.value});
    const onLogin = e => {
        e.preventDefault();  
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
            <section class="container">
            <h1 class="large text-primary" class="col-centered">
                Sign In
            </h1>
                <div class="form-group" class="col-centered">
                    <input 
                        className="formField"
                        type="text"
                        placeholder="Email Adress"
                        name="email" 
                        value={email}
                        onChange = {e => onChange(e)}
                        required/>
                </div>

                <div class="form-group" class="col-centered" >
                    <input
                        className="formField"
                        type="password"
                        placeholder="* Password"
                        name="password"
                        value={password}
                        onChange = {e => onChange(e)}
                        required />
                </div>
                
                <div class="sign In" class="col-centered">
                    <DribbleButton className="AnimateButton" color="deep-orange" onClick={"TODO"} animationDuration={1000} >
                      <div className="LogInText">
                          התחבר
                        </div>   
                    </DribbleButton>
                </div>

                <div class="sign Up" class="col-centered">
                <DribbleButton className="AnimateButton" color="yellow" onClick={"TODO"} animationDuration={1000} >
                         הרשם
                    </DribbleButton>
                </div>

                
            </section>
        </body>
        </html>
        </Fragment>

    )
}

export default LoginAdmin
