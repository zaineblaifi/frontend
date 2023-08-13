import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import axios from 'axios';
//import react from "@vitejs/plugin-react";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/profile', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleDelete = () => {
        axios.get('http://localhost:8080/logout')
            .then(res => {
                navigate('/'); 
            })
            .catch(err => console.log(err));
    }
    

    return (
        <div className="profile">
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <Link to="/Enreg_video" className='btn btn-primary'>Enregistrer video</Link>
                    <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
                </div>
            ) : (
                <div>
                <h1>Loading...</h1>
                <Link to="/login" className='btn btn-primary'>Login</Link>
                </div>
            )}
        </div>

    );
}

export default Profile;