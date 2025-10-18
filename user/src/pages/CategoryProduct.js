import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { } from "../styles/CategoryProductSty.css";
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';

const CategoryProduct = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();


    const getProductByCat = async () => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.product);
            setCategory(data?.category);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        if (params?.slug) getProductByCat();

    }, [params?.slug]);


    return (
        <Layout>
            <div className='container mt-3  category'>
                <h2 className='text-center'> Category -{category.name}</h2>
                <h6 className='text-center'>{products.length} Result Found</h6>
                <hr />

                <div className='row'>
                    <div className='col-md-0 offset-1'>
                        <div className='d-flex flex-wrap'>

                            {products?.map((p) => (
                                <div className="card m-2" style={{ width: '16rem' }}>
                                    <img src={`${process.env.REACT_APP_ACT}/api/v1/product/product-photo/${p._id}`} style={{ width: '250px', height: '250px' }} className="card-img-top" alt={p.name} />
                                    <div className="card-body  ">
                                        <div className="card-name-price">
                                            <h5 className="card-title ">{p.name}</h5>

                                            <h5 className="card-text " style={{ color: "green" }}> ${p.price}</h5>
                                        </div>
                                        <h5 className="card-text">{p.description}</h5>
                                        <div className="card-name-price">
                                            <button className="btn btn-info ms-1"
                                                onClick={() => navigate(`/product/${p.slug}`)}>More details</button>
                                            <button className="btn btn-dark ms-1" onClick={() => {
                                                setCart([...cart, p])
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                toast.success("Item Added to cart");
                                            }}> Add to Card
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            ))}

                        </div>
                        <br />
                        <br /> <br /> <br />

                        <div className='col-md-3 container similar-products'>
                            <button className="btn btn-secondary ms-1" onClick={() => navigate(`/categories`)}
                            >BACK</button>


                        </div>
                        <br /> <br />
                        {/* <div className='m-2 p-3'>
                            {products && products.length < total && (
                                <button className='btn btn-warning' onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}>
                                    {loading ? "Loading..." : "LoadMore"}
                                </button>
                            )}
                        </div> */}
                    </div>


                </div>

            </div>
        </Layout>
    )
}

export default CategoryProduct;
