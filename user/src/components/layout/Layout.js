import React from 'react';
import Footers from "./Footer";
import Headers from "./Header";
import { Helmet } from "react-helmet";

import { Toaster } from 'react-hot-toast';




const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />

                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />


                <title>{title}</title>
            </Helmet>
            <Headers />
            <main style={{ minHeight: "70vh" }}> <Toaster /> {children} </main>
            <Footers />
        </div>
    );
};

Layout.defultProps = {
    title: " Ecommerce app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Rajesh Mahale"
}

export default Layout;
