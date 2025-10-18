import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
//import { toast } from 'react-toastify';
import { } from "../../styles/authstyle.css"
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth(" ");
    const location = useLocation();
    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, address, phone);
        // toast.success("Ragister Successfully");
        try {

            const res = await axios.post(`${process.env.REACT_APP_ACT}/api/v1/auth/login`, { email, password });

            console.log(email, password);

            if (res.data || res.data.success) {
                toast.success("successfully login");
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');

            }
            else {
                toast.error("please check..");
            }

        } catch (error) {
            console.log(error);
            toast.error("something wrong")
        }

    };

    return (

        <Layout title={"Login -Ecommerce app"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>LOGIN FORM</h4>


                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email' required autoFocus />

                    </div>


                    <div className="mb-3">

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter  Password' required autoFocus />
                    </div>

                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={() => { navigate("/forgot-password") }}>Forgot Password</button>


                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>

                </form>

            </div>
        </Layout>

    )
}

export default Login;
