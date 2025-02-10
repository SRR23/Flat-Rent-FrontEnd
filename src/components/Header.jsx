import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            
                <div className="container-xxl nav-bar bg-transparent">
                        <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4 fixed-top shadow-sm custom-navbar">
                            <Link to="/" className="navbar-brand d-flex align-items-center text-center">
                                <div className="icon p-2 me-2">
                                    <img className="img-fluid" src="/img/icon-deal.png" alt="Icon" style={{ width: "30px", height: "30px" }} />
                                </div>
                                <h1 className="m-0 text-primary">EasyRent</h1>
                            </Link>
                            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav ms-auto">
                                    <Link to="/" className="nav-item nav-link active">Home</Link>
                                    <Link to="/flat-list/" className="nav-item nav-link">FlatList</Link>
                                    
                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Category</a>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            <Link to="#" className="dropdown-item">Family</Link>
                                            <Link to="#" className="dropdown-item">Bachelor</Link>
                                            <Link to="#" className="dropdown-item">Office</Link>
                                            <Link to="#" className="dropdown-item">Shop</Link>
                                        </div>
                                    </div>
                                    {/* <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                                            <Link to="/404" className="dropdown-item">404 Error</Link>
                                        </div>
                                    </div> */}
                                    <Link to="/about/" className="nav-item nav-link">About</Link>
                                    <Link to="/contact/" className="nav-item nav-link">Contact</Link>
                                </div>
                                <div className="d-flex align-items-center ms-3">
                                    {/* Property Type Dropdown */}
                                    <select className="form-select me-2" value="" style={{ cursor: "pointer" }}>
                                        <option value="">Select Flat Type</option>
                                        <option value="apartment">Family</option>
                                        <option value="house">Bachelor</option>
                                        <option value="villa">Office</option>
                                        <option value="commercial">Shop</option>
                                    </select>
                                    {/* Location Dropdown */}
                                    <select className="form-select me-2" value="" style={{ cursor: "pointer" }}>
                                        <option value="">Select Location</option>
                                        <option value="dhaka">Nissan Mor</option>
                                        <option value="chittagong">Pearatola</option>
                                        <option value="sylhet">Custom Mor</option>
                                        <option value="khulna">Jel Mor</option>
                                    </select>
                                    <button className="btn btn-primary">Search</button>
                                </div>
                                {/* <Link to="/add-property" className="btn btn-primary px-3 d-none d-lg-flex ms-3">Add Property</Link> */}
                            </div>
                        </nav>
                </div>
            
        </div>
    );
};

export default Header;