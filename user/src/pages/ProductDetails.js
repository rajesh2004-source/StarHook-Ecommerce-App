import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { } from '../styles/ProductDetailsSty.css'
import toast from 'react-hot-toast';
import { useCart } from '../context/cart'

const ProductDetails = () => {

    const params = useParams();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();

    // const [relatedProduct, setRelatedProduct] = useState([]);


    useEffect(() => {
        if (params?.slug) getproduct()
    }, [params?.slug])

    //get product
    const getproduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/product/getsingle-product/${params.slug}`);
            setProduct(data?.product);
            // getsimilarpro(data?.product._id, data?.product.category._id);

        } catch (error) {
            console.log(error);
        }
    }

    //get similar pro
    // const getsimilarpro = async (pid, cid) => {
    //     try {
    //         const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/product/related-product/${pid}/${cid}`);
    //         setRelatedProduct(data?.product);

    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    return (
        <Layout title={'product details'}>
            <div className='row container product-details' >


                <div className='col-md-5 '>
                    <img src={`${process.env.REACT_APP_ACT}/api/v1/product/product-photo/${product._id}`}
                        style={{ width: '400px', height: '400px' }}
                        className="card-img-top" alt={product.name} />

                </div>

                <div className='col-md-6 product-details-info'>
                    <h1 className='text-center'>Product Details</h1>
                    <hr />
                    <>
                        <h5>Name : {product.name}</h5>
                        <h5>Description : {product.description}</h5>
                        <h5>Price : {product.price}</h5>
                        {/* <h5>Category : {product.category.name}</h5> */}
                        <h5>Quantity : {product.quantity}</h5> <br />
                        <button className="btn btn-secondary ms-1" onClick={() => {
                            setCart([...cart, product])
                            localStorage.setItem('cart', JSON.stringify([...cart, product]))
                            toast.success("Item Added to cart");
                        }}
                        >ADD TO CART</button>


                    </>
                </div>

            </div>
            <hr />

            <div className='col-md-3 container similar-products'>
                <button className="btn btn-secondary ms-1" onClick={() => navigate(`/`)}
                >BACK</button>

                {/* <h1> Similar products</h1>
                {JSON.stringify(relatedProduct, null, 4)} */}
            </div>
        </Layout>
    )
}

export default ProductDetails
