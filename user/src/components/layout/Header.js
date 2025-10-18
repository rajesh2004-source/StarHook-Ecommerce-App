import React from 'react';
import { Link } from 'react-router-dom'
import { TiShoppingCart } from 'react-icons/ti'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../form/SearchInput'
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';


const Header = () => {

    const [auth, setAuth] = useAuth(" ");
    const categories = useCategory("");
    const [cart] = useCart();


    const handlelogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem('auth');
        toast.success("Logout Successfully");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand ">
                            <TiShoppingCart /> StarHook Online Shopping Hub</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                            <SearchInput />
                            <li className="nav-item">
                                <Link to="/" className="nav-link ">Home</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={'/categories'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <>
                                    <ul className="dropdown-menu" >
                                        <li>
                                            <Link className="dropdown-item" to={`/categories`} >All Categories</Link>
                                        </li>
                                        {categories && categories?.map((ca) => (

                                            <li>
                                                <Link className="dropdown-item" to={`/category/${ca.slug}`} >{ca.name}</Link></li>
                                        ))} </ul>

                                </>

                            </li >
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <Link to="/register" className="nav-link" >register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className="nav-link" >login</Link>
                                    </li>
                                </>) : (<>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</Link></li>
                                            <li><Link to="/login" onClick={handlelogout} className="dropdown-item" >logout</Link></li>
                                        </ul>
                                    </li>

                                </>)
                            }
                            <li className="nav-item">

                                <Link to="/cart" className="nav-link" > <Badge count={cart.length} showZero> <h6>CART</h6> </Badge></Link>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>

    )
}

export default Header;
