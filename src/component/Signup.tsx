import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Signup.css";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const navigate = useNavigate();

    const [signUpData, setsignUpData] = useState({
        name: "",
        email: "",
        password: ""
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setsignUpData((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const myApi = `https://backpressapibuilder.herokuapp.com/backbackuser`;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const salt = Number(process.env.SALT) || 10;
        if (signUpData.name !== '' && signUpData.email !== '' && signUpData.password !== '') {
            try {
                bcrypt.genSalt(salt, function (err, salt) {
                    bcrypt.hash(signUpData.password, salt, function (err, hash) {
                        // Store hash in your password DB.
                        axios.post(myApi, { name: signUpData.name, email: signUpData.email, password: hash })
                            .then((res) => {
                                console.log(res);
                                window.localStorage.setItem('backbackUser', res.data._id);
                                navigate('/createSchema');
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    });
                });
            } catch (error) {
                console.log("error,", error);
            }
        }
    }

    return (
        <section>
            <nav className='navbar-Signup'>
                <img alt='logo' src={require('../Assets/translogo.png')} />
                <p>BACKPRESS</p>
            </nav>
            <hr />
            <main>
                <div className='main-text'>you are just a email away.</div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input name='name' onChange={(e) => handleChange(e)} type='text' placeholder='Enter Name' />
                    <input name='email' onChange={(e) => handleChange(e)} type='text' placeholder='Enter Email' />
                    <input name='password' onChange={(e) => handleChange(e)} type='password' placeholder='Enter Password' />
                    <button type='submit'>Start journey</button>
                </form>
            </main>
            <p><Link to='/login'>Already have an Account? Login Now!</Link></p>
        </section>
    )
}

export default Signup;