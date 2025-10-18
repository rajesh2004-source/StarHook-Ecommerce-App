import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
//import { toast } from 'react-toastify';
import { } from "../../styles/authstyle.css"

const ForgotPassword = () => {


    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, address, phone);
        // toast.success("Ragister Successfully");
        try {

            const res = await axios.post(`${process.env.REACT_APP_ACT}/api/v1/auth/forgot-password`, { email, newPassword, question });

            // console.log(email, password);

            if (res.data || res.data.success) {
                toast.success("successfully Reset Password");

                navigate('/login');

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
        <Layout title={"ForgotPassword - Ecommerce App"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>RESET PASSWORD</h4>


                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email' required autoFocus />

                    </div>

                    <div className="mb-3">

                        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='What Is Your Favorite Sports ?' required autoFocus />

                    </div>


                    <div className="mb-3">

                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter  Password' required autoFocus />
                    </div>

                    <button type="submit" className="btn btn-primary">RESET</button>

                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword
