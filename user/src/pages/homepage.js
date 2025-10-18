import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AiOutlineReload } from "react-icons/ai";
import { Checkbox, Radio } from 'antd';
import { prices } from '../components/price';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { } from "../styles/Homepage.css"

const Homepage = () => {

    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useCart();

    const navigate = useNavigate();


    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/category/get-category`);

            if (data?.success) {
                setCategories(data?.getcat);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, [])

    //getall products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            //const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/product/product-list/${page}`);
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/product/get-product`);

            setLoading(false);
            setProduct(data.product);

        } catch (error) {
            setLoading(false);
            console.log(error);

        }


    }

    //get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/product/product-count`);
            setTotal(data?.total);


        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        if (page === 1) return
        LoadMore();
    }, [page])

    //loadmore
    const LoadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/product/product-list/${page}`);
            setLoading(false);

            setProduct([...products, ...data.products])


        } catch (error) {
            console.log(error);
            setLoading(false);


        }
    }


    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        }
        else {
            all = all.filter(c => c !== id);
        }
        setChecked(all);
    }

    useEffect(() => {
        if (!checked.length && !radio.length) getAllProducts();
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio])


    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_ACT}/api/v1/product/product-filters`, { checked, radio });
            setProduct(data?.products);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <Layout title={"All products - Best Offers"} >
                {/* image */}
                <img
                    src="images/R.jpg"
                    className="banner-img"
                    alt="bannerimage"
                    width={"100%"}
                    height={"450px"}
                />

                <div className="container-fluid row mt-3 home-page">
                    <div className='col-md-3 filters'>
                        <h4 className='text-center '>Filter By Category</h4>
                        <div className='d-flex flex-column'>

                            {categories?.map((c) => (
                                <Checkbox className="abc" key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                    {c.name}
                                </Checkbox>
                            ))}
                        </div>


                        {/* price filter */}
                        <h4 className='text-center mt-4'>Filter By Price</h4>
                        <div className='d-flex flex-column '>
                            <Radio.Group onChange={e => setRadio(e.target.value)}>
                                {prices?.map(p => (
                                    <div key={p._id}>
                                        <Radio className='pqr' value={p.array}>{p.name}</Radio>

                                    </div>
                                ))}
                            </Radio.Group>

                        </div>

                        <div className='d-flex flex-column '>
                            <button className='btn btn-danger' onClick={() => window.location.reload()}> RESET FILTERS</button>
                        </div>

                    </div>
                    <div className='col-md-9'>
                        {/* {JSON.stringify(radio, null, 4)} */}
                        <h1 className='text-center'>All Products </h1>
                        <hr />
                        <div className='d-flex flex-wrap'>

                            {products?.map((p) => (
                                <div className="card m-2" style={{ width: '17rem' }}>
                                    <img src={`${process.env.REACT_APP_ACT}/api/v1/product/product-photo/${p._id}`} style={{ width: '250px', height: '250px' }} className="card-img-top" alt={p.name} />
                                    <div className="card-body  ">
                                        <div className="card-name-price">
                                            <h5 className="card-title ">{p.name}</h5>
                                            <b>
                                                <p className="card-text" style={{ color: "green" }}>  ${p.price}</p></b>
                                        </div>
                                        <p className="card-text">{p.description}</p>
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

                        <div className='m-2 p-3'>
                            {products && products.length < total && (
                                <button className='btn loadmore' onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}>
                                    {loading ? ("Loading...") : (<>
                                        {" "}
                                        Loadmore <AiOutlineReload />
                                    </>)}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Layout >
        </>
    );
};

export default Homepage;
