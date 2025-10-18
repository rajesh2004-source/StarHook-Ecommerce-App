import React from 'react'
import { Link } from "react-router-dom";
import Layout from '../components/layout/Layout'

const pagenotfound = () => {
    return (
        <Layout title={"go back page not found"}>
            <div className="pnf">
                <h1 className='pnn'>404  Page Not Found</h1>
                <Link to="/" className="pnf-btn">
                    Go Back
                </Link>
            </div>
        </Layout>
    )
}

export default pagenotfound
