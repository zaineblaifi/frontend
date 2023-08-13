import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
function Register() {
  const [values, setValues]=useState({
    name: '',
    email:'',
    phone:'',
    password :'',
  })
  const navigate= useNavigate();
  const handleSubmit= (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8080/register', values)
    .then(res=> {
      if(res.data.Status ==="Success"){
        navigate('/login');
      } else {
        alert("Error");
      }
    })
    .then(err => console.log(err));
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form name="my-form" onSubmit={handleSubmit} action="/auth/register" method="post">

                <div className="form-group row mt-3">
                  <label htmlFor="first_name" className="col-md-4 col-form-label text-md-right">Name</label>
                  <div className="col-md-10"> 
                    <input type="text" id="first_name" className="form-control" name="name" 
                    onChange={e=>setValues({...values, name:e.target.value})}/>
                  </div>
                  
                </div>

                <div className="form-group row mt-3">
                  <label htmlFor="last_name" className="col-md-4 col-form-label text-md-right">Email</label>
                  <div className="col-md-10"> 
                    <input type="email" id="last_name" className="form-control" name="email"
                    onChange={e=>setValues({...values, email:e.target.value})}/>
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <label htmlFor="phone_number" className="col-md-4 col-form-label text-md-right">Phone Number</label>
                  <div className="col-md-10"> 
                    <input type="number" id="phone_number" className="form-control" name="phone"
                    onChange={e=>setValues({...values, phone:e.target.value})}/>
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                  <div className="col-md-10"> 
                    <input type="password" id="password" className="form-control" name="password"
                    onChange={e=>setValues({...values, password:e.target.value})}/>
                  </div>
                </div>

                <div className="form-group row mt-3">
                  <label htmlFor="passwordConfirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                  <div className="col-md-10"> 
                    <input type="password" id="passwordConfirm" className="form-control" name="passwordConfirm"/>
                  </div>
                </div>

                <div className="col-md-8 offset-md-4 mt-5"> 
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Register