import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Search = () => {

    const [values, setValues] = useSearch([]);
    const [cart, setCart] = useCart();

    const navigate = useNavigate();

    return (
        <Layout title={"search results"}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>{values?.result.length < 1 ? "no products found" : `Found ${values?.result.length}`}</h6>
                    <div className='d-flex flex-wrap mt-4'>
                        {values?.result.map((s) => (
                            <div className="card m-2" style={{ width: '18rem' }}>
                                <img src={`${process.env.REACT_APP_ACT}/api/v1/product/product-photo/${s._id}`} style={{ width: '250px', height: '250px' }} className="card-img-top" alt={s.name} />
                                <div className="card-body  ">
                                    <h5 className="card-title ">{s.name}</h5>
                                    <p className="card-text">{s.description}</p>
                                    <p className="card-text"> RS. {s.price}</p>

                                    <button className="btn btn-info ms-2"
                                        onClick={() => navigate(`/product/${s.slug}`)}>More details</button>
                                    <button className="btn btn-dark ms-2" onClick={() => {
                                        setCart([...cart, s])
                                        localStorage.setItem('cart', JSON.stringify([...cart, s]))
                                        toast.success("Item Added to cart");
                                    }}> Add to Card
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search
