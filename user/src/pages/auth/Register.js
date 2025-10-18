import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { } from "../../styles/authstyle.css"

const Register = () => {

    const [name, setNAme] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [question, setQuestion] = useState("")

    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, address, phone);
        // toast.success("Ragister Successfully");
        try {

            const res = await axios.post(`${process.env.REACT_APP_ACT}/api/v1/auth/register`, { name, email, phone, address, password, question });

            console.log(name, email, password, address, phone);

            if (res.data || res.data.success) {
                // toast.success(res.data.message);
                toast.success("successfully register");

                navigate('/login');


            }
            else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("something wrong")
        }

    };
    // console.log(process.env.REACT_APP_ACT);



    return (
        <Layout title={"Ragister -Ecommerce app"}>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>REGISTER FORM</h4>
                    <div className="mb-3">
                        <input type="text" value={name} onChange={(e) => setNAme(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter Name' required autoFocus />
                    </div>

                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email' required autoFocus />

                    </div>


                    <div className="mb-3">

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter  Password' required autoFocus />
                    </div>

                    <div className="mb-3">
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='Enter phone' required autoFocus />
                    </div>

                    <div className="mb-3">
                        <input type="text " value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter Address' required autoFocus />
                    </div>

                    <div className="mb-3">
                        <input type="text " value={question} onChange={(e) => setQuestion(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='What Is Your Favorite Sports ?' required autoFocus />
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register

// Rajesh Mahale
