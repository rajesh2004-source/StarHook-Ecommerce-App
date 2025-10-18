import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './../components/layout/Layout'
import useCategory from '../hooks/useCategory'
import { useNavigate } from 'react-router-dom';

const Categories = () => {

    const categories = useCategory("");
    const navigate = useNavigate();

    return (
        <Layout title={"All Categories"}>

            <div className='container' style={{ marginTop: "100px" }}>
                <div className='row container '>
                    {categories.map(c => (
                        <div className='col-md-4 mt-5 mb-3 gx-3 gy-3' style={{ padding: "10px", textAlign: "center" }} key={c._id}>
                            <div className="card  btn btn-secondary" style={{ height: "150px", width: "200px", padding: "30px" }} >
                                <Link to={`/category/${c.slug}`} className='btn btn-cat ' style={{}}> <h3>{c.name}</h3></Link>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <br />
            <br /> <br /> <br />

            <div className='col-md-3 container similar-products'>
                <button className="btn btn-secondary ms-1" onClick={() => navigate(`/`)}
                >BACK</button>


            </div>
            <br /> <br />

        </Layout>
    )
}

export default Categories
