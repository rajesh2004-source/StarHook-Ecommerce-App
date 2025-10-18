import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Users = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    //get all user
    const getAllusers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/auth/allUser`);
            setUsers(data.user);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllusers();
    }, [])


    return (
        <Layout title={'Dashboard -All Users'}>
            <div className='container-fluid m-3 p-3'>

                <div className="row dashboard">
                    <div className="col-md-3"> <AdminMenu /></div>
                    <div className="col-md-9">
                        <h1 className="">All Users</h1>
                        <div className="card w-75 p-3">
                            {users?.map((u) => (

                                <div className='card w-75 p-3 ' style={{ textTransform: "uppercase" }}>
                                    <h5 style={{ color: "darkblue" }}> USER NAME: {u.name}<br /></h5>
                                    <h6>USER EMAIL: {u.email}<br /></h6>
                                    <h6>  USER PHONE NO:{u.phone} <br /></h6>
                                    <h6>USER ADDRESS:{u.address} <br /></h6>

                                </div>
                            ))}

                        </div>
                        <br />
                        <br />
                        <button className='btn btn-outline-primary btn-md xyz' onClick={() => navigate(`/`)}
                            style={{ color: "black" }}>GO TO HOME PAGE</button>
                    </div>

                </div>
            </div>
        </Layout>


    )
}

export default Users
