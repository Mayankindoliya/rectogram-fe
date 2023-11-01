import React, { useState } from 'react';
import './Signup.css'
import socialDesktop from '../images/social-desktop.PNG'
import socialMobile from '../images/social-mobile.PNG'
// import link react router dom
import { Link } from 'react-router-dom'
import axios from 'axios';   // Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser
import { API_BASE_URL } from '../../src/config';
import Swal from 'sweetalert2';

const SignUp = () => {
    //state variable
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false)

    //function for signup
    const signup = (event) => {
        event.preventDefault();

        setLoading(true);     // loading set here
        const requestData = { fullName: fullName, email, password }
        axios.post(`${API_BASE_URL}/signup`, requestData)  // setting up the axios fucntionality,  Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser
            .then((result) => {
                if (result.status === 200) {
                    setLoading(false);     // loading set here
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered'
                    })
                }
                setFullName('');
                setEmail('');
                setPassword('');

            })
            .catch((err) => {
                console.log(err);
                setLoading(true);     // loading set here
                Swal.fire({
                    icon: 'error',
                    title: 'some error occurred please try again later'
                })
            })

    }
    return (
        <div className='container login-container'>
            <div className="row">
                <div className="col-md-7 col-sm-12 d-flex justify-content-center align-items-center">
                    <img className='socialDesktop' style={{ height: '88%' }} src={socialDesktop} alt='social Desktop' />
                    <img className='socialMobile' src={socialMobile} alt='social Mobile' />
                </div>
                <div className="col-md-5 col-sm-12">
                    <div className="card shadow">
                        {loading ? <div className='col-md-12 mt-3 text-center'>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : ""}
                        <div className="card-body px-5">
                            <h4 className="card-title text-center mt-3 fw-bold">Sign up</h4>
                            <form onSubmit={(e) => signup(e)}>
                                <input type="text" className="p-2 mb-2 form-control input-bg" placeholder='phone' />
                                <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="p-2 mb-2 form-control input-bg" placeholder='Email' />
                                <input type="text" value={fullName} onChange={(ev) => setFullName(ev.target.value)} className="p-2 mb-2 form-control input-bg" placeholder='Full Name' />
                                <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="p-2 mb-2 form-control input-bg" placeholder='password' />
                                <div className='mt-3 d-grid'>
                                    <button className="custom-btn custom-btn-blue" type='submit'>Sign up</button>
                                </div>
                                <div className='my-4'>
                                    <hr className='text-muted' />
                                    <h5 className='text-muted text-center'>OR</h5>
                                    <hr className='text-muted' />
                                </div>
                                <div className='mt-3 mb-5 d-grid '>
                                    <button className="custom-btn custom-btn-white">
                                        <span className='text-muted fs-6'>Already have an account?</span>
                                        <Link to="/login" className='ms-1 text-info fw-bold'>Log in</Link>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
