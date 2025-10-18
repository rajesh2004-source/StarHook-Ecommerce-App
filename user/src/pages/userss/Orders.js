import React, { useState, useEffect } from "react";
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/auth/orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);


    return (
        <Layout title={'Your Orders'}>
            <div className='container-fluid m-3 p-3 dashboard'>
                <div className="row">
                    <div className="col-md-3"> <UserMenu /></div>
                    <div className="col-md-8">
                        <h1 className="text-center">All Orders</h1>

                        {orders?.map((o, i) => {
                            return (
                                <div className="border shadow">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">NO</th>
                                                <th scope="col">STATUS</th>
                                                <th scope="col">BUYER</th>
                                                <th scope="col"> DATE</th>
                                                <th scope="col">PAYMENT</th>
                                                <th scope="col">QUANTITY</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                <div className="col-md-4">
                                                    <img
                                                        src={`${process.env.REACT_APP_ACT}/api/v1/product/product-photo/${p._id}`}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        width="100px"
                                                        height={"150px"}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <b>   <p>{p.name}</p></b>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <b>  <p style={{ color: "green" }}>Price : {p.price}</p> </b>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
