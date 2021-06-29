import React, { useState } from 'react';
const axios = require("axios").default;




const Login = (props) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value // it means = the remaining value from the password input field that is targetted by the user in the from (e)
        }
        await axios.post("http://localhost:3001/users/login", data)
        .then((response) => localStorage.setItem(response.headers.get("x-auth")));
        // console.log(data);
    }


        return (
            <div>
                {/* <input placeholder="Enter your username" id="username" type="text"/>
                <input placeholder="Enter your password" id="password" type="text"/> */}
                <form className="form-signin" onSubmit={onSubmit}>
                    {/* <img class="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"> */}
                    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

                    <div class="form-floating">
                        <input type="email" class="form-control" name="email" id="floatingInput" placeholder="name@example.com"/>
                        <label for="floatingInput">Email address</label>
                    </div>

                    <div class="form-floating">
                        <input type="password" class="form-control" name="password" id="floatingPassword" placeholder="Password"/>
                        <label for="floatingPassword">Password</label>
                    </div>

                    <div class="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                        <button class="w-100 btn btn-lg btn-primary"  type="submit">Sign in</button>
                        <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
                </form>

            </div>
        )}


export default Login;