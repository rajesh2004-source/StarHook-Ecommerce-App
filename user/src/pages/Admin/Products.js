import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from './../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Products = () => {

    const [products, setProduct] = useState([]);

    //getall products
    const getAllProducts = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_ACT}/api/v1/product/get-product`);
            setProduct(data.product);

        } catch (error) {
            console.log(error);
            toast.error("error in  geting products");
        }

    }

    useEffect(() => {
        getAllProducts();
    }, [])


    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>

                <div className='row dashboard'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className=''>All Products List</h1>
                        <div className='d-flex flex-wrap'>

                            {products?.map((p) => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                    <div className="card m-3" style={{ width: '16rem' }}>
                                        <img src={`${process.env.REACT_APP_ACT}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                            <p className="card-text">{p.price}</p>

                                        </div>
                                    </div>

                                </Link>
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
