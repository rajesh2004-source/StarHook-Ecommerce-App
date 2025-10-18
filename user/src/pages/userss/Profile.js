import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {

    const [auth, setAuth] = useAuth();

    const [name, setNAme] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    //get user data
    useEffect(() => {
        const { name, email, password, address, phone } = auth.user
        setNAme(name);
        setEmail(email);
        setPassword(password);
        setAddress(address);
        setPhone(phone);
    }, [auth?.user])

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, address, phone);
        // toast.success("Ragister Successfully");
        try {

            const { data } = await axios.put(`${process.env.REACT_APP_ACT}/api/v1/auth/profile`, { name, email, phone, address, password });

            if (data?.error) {
                toast.error(data?.error);
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }


        } catch (error) {
            console.log(error);
            toast.error("something wrong")
        }

    };

    return (
        <Layout title={'Your Profile'}>
            <div className='container-fluid m-3 p-3 dashboard'>
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='form-container'>
                            <form onSubmit={handleSubmit}>
                                <h4 className='title'>USER PROFILE</h4>
                                <div className="mb-3">
                                    <input type="text" value={name} onChange={(e) => setNAme(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter Name' autoFocus />
                                </div>

                                <div className="mb-3">

                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter Email' autoFocus disabled />

                                </div>


                                <div className="mb-3">

                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter  Password' autoFocus />
                                </div>

                                <div className="mb-3">
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='Enter phone' autoFocus />
                                </div>

                                <div className="mb-3">
                                    <input type="text " value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter Address' autoFocus />
                                </div>

                                <button type="submit" className="btn btn-primary">UPDATE</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
