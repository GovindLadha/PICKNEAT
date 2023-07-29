import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';



export default function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#1a3556b3" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img style={{maxHeight:'40px', maxWidth:'150px'}} src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt='logo'/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav me-auto mb-2">
                            <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            {(localStorage.getItem("authToken")) ?
                                <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
                                : ""}
                        </div>
                        {!(localStorage.getItem("authToken")) ?
                            <div className='d-flex '>
                                <Link className="btn bg-success text-white mx-1" to="/login">Login</Link>
                                <Link className="btn bg-success text-white mx-1" to="/createuser">SignUp</Link>
                            </div>
                            : <div className='d-flex '>
                                <div className="btn bg-success text-white mx-1" onClick={() => { setCartView(true) }}>
                                    My Cart
                                    <span className="badge badge-pill bg-danger mx-1">{data.length}</span>
                                </div>
                                {cartView ? <Model onClose={() => setCartView(false)}><Cart /> </Model> : null}
                                <div className="btn bg-success text-white mx-2" onClick={handleLogOut}>Log Out</div>
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
