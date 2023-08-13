import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
    const [values, setValues]=useState({
        email:'',
        password :'',
    })

    const navigate= useNavigate();
    axios.defaults.withCredentials= true;
    const handleSubmit= (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/login', values)
            .then(res=> {
                if(res.data.Status ==="Success"){
                    navigate('/profile');
                    console.log(('success'));
                } else {
                    alert(res.data.Error);
                }
            })
            .catch(err => {
                console.log("Error:", err);
            } )
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group mt-4">
                <label htmlFor="inputEmail">Email</label>
                <input type="email" name="email"
                       onChange={e=> setValues({...values, email: e.target.value})}
                       className="form-control mt-4" id="inputEmail" placeholder="Email"/>
            </div>
            <div className="form-group mt-4">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" name="password"
                       onChange={e=> setValues({...values, password: e.target.value})}
                       className="form-control mt-4" id="inputPassword" placeholder="Password"/>
            </div>

            <button type="submit" className="btn btn-primary mt-4">Sign in</button>
            <div className="form-group mt-4">

                <a href="/register" >Signup</a>
            </div>
        </form>
    </div>
  )
}

export default Login