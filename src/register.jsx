import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
const transport = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: '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',
    },
  })
);
function Register() {
  const [values, setValues]=useState({
    name: '',
    email:'',
    phone:'',
    password :'',
    confirmPassword :'',
  })
  const navigate= useNavigate();
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const handleSubmit= async (event) =>{
    event.preventDefault();
    
    if (values.password.trim() !== values.confirmPassword.trim()){
      alert("Passwords do not match");
      return; 
    }
    if (!isValidEmail(values.email)) {
      alert('Invalid email address');
      return;
    }
  
    try {
      
      await transport.sendMail({
        from: 'developerzaineb@gmail.com',
        to: values.email,
        subject: 'Confirmation de compte',
        text: 'Bienvenue! Veuillez confirmer votre compte en cliquant sur le lien suivant: ...',
      });
  
      // Rediriger vers la page de connexion
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement ou de l\'envoi de l\'e-mail', error);
    }
    axios.post('http://localhost:8080/register', values)
    .then(res=> {
      if(res.data.Status ==="Success"){
        navigate('/login', { state: { signupSuccess: true } })
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
                  <label htmlFor="confirmPassword" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                  <div className="col-md-10"> 
                    <input type="password" id="confirmPassword" className="form-control" name="confirmPassword"
                    onChange={e=>setValues({...values, confirmPassword:e.target.value})}/>
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