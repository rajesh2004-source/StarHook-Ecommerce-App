import React, { useState, useEffect } from 'react'
import Layout from './../components/layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { } from "../styles/CartSty.css";

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setinstance] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    //total price 
    const totalPrice = () => {
        try {
            let total = 0
            cart?.map(item => { total = total + item.price });
            return total;

        } catch (error) {
            console.log(error);
        }
    }

    //remove cart
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }

    //pay token
    const getToken = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token])


    //handlePayment
    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${process.env.REACT_APP_ACT}/api/v1/product/braintree/payment`, {
                nonce, cart
            });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            // navigate('/dashboard/user/orders');
            navigate('/');
            toast.success("Payment Completed Successfully");

        } catch (error) {
            console.log(error);
            setLoading(false);

        }
    }

    return (
        <Layout>
            <div className='cart-page'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center  bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name} `}
                        </h1>
                        <h4 className='text-center' >
                            {cart?.length ? `you have ${cart.length} items in your cart ${auth?.token ? "" : " please login to checkout"}` : "your cart is empty"}
                        </h4>
                    </div>
                </div><br />
                <div className="container ">
                    <div className='row'>
                        <div className='col-md-7  p-0 m-0'>
                            {
                                cart?.map(p => (

                                    <div className='row mb-2 p-3 card  flex-row m-4 ' key={p._id}  >

                                        <div className='col-md-4 card'>

                                            <img src={`${process.env.REACT_APP_ACT}/api/v1/product/product-photo/${p._id}`} style={{ width: '170px', height: '130px' }} className="card-img-top" alt={p.name} />
                                        </div>
                                        <div className='col-md-4 '>
                                            <h5>{p.name}</h5>
                                            <h6>{p.description}</h6>
                                            <h5>{p.price}</h5>
                                            <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>  REMOVE</button>
                                        </div>

                                    </div>
                                ))}

                        </div>
                        <div className='col-md-5 cart-summary '>
                            <div className='text-center'>
                                <h2>Cart Summary</h2>
                                <p> Total | Checkout | Payment</p>
                            </div>

                            <hr />
                            <h4>Total :  <h4 style={{ color: "green" }}>$. {totalPrice()}</h4> </h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className='mb-3'>
                                        <h4>Current Address :</h4>
                                        <h4>{auth?.user?.address}</h4>
                                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='mb-3'>
                                        {auth?.token ? (
                                            <button className='btn btn-outline-warning'
                                                onClick={() => navigate('/dashboard/user/profile')}
                                            >Update Address</button>
                                        ) : (
                                            <button className='btn btn-outline-warning'
                                                onClick={() => navigate('/login', { state: "/cart", })
                                                }>please Login Checkout
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className='mt-2'>
                                {
                                    !clientToken || !cart?.length || !auth ? ("") : (
                                        <>
                                            <DropIn
                                                options={{
                                                    authorization: clientToken,
                                                    paypal: {
                                                        flow: 'vault'
                                                    }
                                                }}

                                                onInstance={(instance) => setinstance(instance)}
                                            />
                                            <button className='btn btn-primary'
                                                onClick={handlePayment}

                                            >
                                                {
                                                    loading ? "Processing..." : "Make Payment"
                                                }

                                            </button>
                                        </>
                                    )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
