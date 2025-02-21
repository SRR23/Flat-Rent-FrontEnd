import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    // Simulated authentication state (Replace this with real auth state)
    const [user, setUser] = useState({ username: "JohnDoe" }); // Change to `null` if not logged in
    const location = useLocation();

    // Helper function to check if the current path matches the link
    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <div>
            <div className="container-xxl nav-bar bg-transparent">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4 fixed-top shadow-sm custom-navbar">
                    <Link to="/" className={`navbar-brand d-flex align-items-center text-center ${isActive('/')}`}>
                        <div className="icon p-2 me-2">
                            <img className="img-fluid" src="/img/logo.jpeg" alt="Icon" style={{ width: "50px", height: "50px" }} />
                        </div>
                    </Link>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto">
                            <Link to="/" className={`nav-item nav-link ${isActive('/')}`}>Home</Link>
                            <Link to="/flat-list/" className={`nav-item nav-link ${isActive('/flat-list/')}`}>FlatList</Link>
                            
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Category</a>
                                <div className="dropdown-menu rounded-0 m-0">
                                    <Link to="#" className={`dropdown-item ${isActive('#')}`}>Family</Link>
                                    <Link to="#" className={`dropdown-item ${isActive('#')}`}>Bachelor</Link>
                                    <Link to="#" className={`dropdown-item ${isActive('#')}`}>Office</Link>
                                    
                                </div>
                            </div>
                            <Link to="/about/" className={`nav-item nav-link ${isActive('/about/')}`}>About</Link>
                            <Link to="/contact/" className={`nav-item nav-link ${isActive('/contact/')}`}>Contact</Link>
                        </div>

                        {/* Search Section */}
                        <div className="d-flex align-items-center ms-3">
                            <select className="form-select me-2" style={{ cursor: "pointer" }}>
                                <option value="">Select Flat Type</option>
                                <option value="apartment">Family</option>
                                <option value="house">Bachelor</option>
                                <option value="villa">Office</option>
                                
                            </select>
                            <select className="form-select me-2" style={{ cursor: "pointer" }}>
                                <option value="">Select Location</option>
                                <option value="dhaka">Nissan Mor</option>
                                <option value="chittagong">Pearatola</option>
                                <option value="sylhet">Custom Mor</option>
                                <option value="khulna">Jel Mor</option>
                            </select>
                            <button className="btn btn-primary">Search</button>
                        </div>

                        <div className="ms-3">
                            <Link to="/login/" className="btn btn-outline-primary">Login</Link>
                        </div>

                        {/* User Login / Dropdown */}
                        {/* <div className="ms-3">
                            {user ? (
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                        {user.username}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <Link to="/profile" className="dropdown-item">Profile</Link>
                                        <button className="dropdown-item text-danger" onClick={() => setUser(null)}>Logout</button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className="btn btn-outline-primary">Login</Link>
                            )}
                        </div> */}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
