import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import { useGetAllUserQuery } from '../store/user';

const Login = () => {

    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    });


    const [foundUser, setfoundUser] = useState({ userData: [{ email: '', password: '', name: '', _id: '' }] });
    let user: String = window.localStorage.getItem('backbackUser') || "";
    const { isLoading, isSuccess, isFetching, isError, data } = useGetAllUserQuery()
    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            setfoundUser(data)
        }
    }, [isFetching, isLoading])

    const navigate = useNavigate();



    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (loginData.email !== '' && loginData.password !== '') {
            foundUser.userData.filter((val) => {
                if (val.email === loginData.email) {
                    bcrypt.compare(loginData.password, val.password, function (err, res) {
                        if (res == true) {
                            window.localStorage.setItem("backbackUser", val._id);
                            navigate('/createSchema');
                        }
                    });
                } else {
                    alert("no email found.")
                }
            })
        }
    }

    function handleLogin(e: React.ChangeEvent<HTMLInputElement>) {
        setloginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <section>
            <nav className='navbar-Signup'>
                <img alt='logo' src={require('../Assets/translogo.png')} />
                <p>BACKPRESS</p>
            </nav>
            <hr />
            <main>
                <div className='main-text'>resume your journey</div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input name='email' onChange={(e) => handleLogin(e)} type='text' placeholder='Enter Email' />
                    <input name='password' onChange={(e) => handleLogin(e)} type='password' placeholder='Enter Password' />
                    <button type='submit'>resume journey</button>
                </form>
                <p className='link' ><Link to='/signup'>Don't have an Account? Create Now!</Link></p>
            </main>
        </section>
    )
}

export default Login;