import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
const messages = ["Find Your Dream Flat!", "Best Deals Available Now!"];

const FlatListPage = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 4000); // Change message every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div>

            {/* <!-- Header Start --> */}
                {/* <div className="container-fluid header bg-white p-0">
                    <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                        <div className="col-md-6 p-5 mt-lg-5">
                            <h1 className="display-5 animated fadeIn mb-4">Flat List</h1> 
                                <nav aria-label="breadcrumb animated fadeIn">
                                <ol className="breadcrumb text-uppercase">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    
                                    <li className="breadcrumb-item text-body active" aria-current="page">Flat List</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-md-6 animated fadeIn">
                            <img className="img-fluid" src="/img/header.jpg" alt="" />
                        </div>
                    </div>
                </div> */}
            {/* <!-- Header End --> */}

                {/* Header Below Navbar */}
                <div className="container-fluid header bg-white p-0" style={{ marginTop: "80px" }}>  
                    <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                        <div className="col-md-6 p-5 mt-lg-5">
                            <h1 className="display-5 animated fadeIn mb-4">Flat List</h1>
                            <nav aria-label="breadcrumb animated fadeIn">
                                <ol className="breadcrumb text-uppercase">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item text-body active" aria-current="page">Flat List</li>
                                </ol>
                            </nav>
                        </div>
                        
                        <div className="col-md-6 d-flex justify-content-center align-items-center position-relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={messageIndex} // Key ensures correct animation switching
                            className="position-absolute text-center text-primary fw-bold"
                            style={{ fontSize: "2rem", width: "100%" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        >
                            {messages[messageIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                    </div>
                </div>

                

                {/* <!-- Property List Start --> */}

                <div className="container-xxl py-1">
                    <div className="container">

                        <div>
                            <div className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="property-item rounded overflow-hidden">
                                            <div className="position-relative overflow-hidden">
                                                <Link to="/flat-details/"><img className="img-fluid fixed-img" src="/img/p1.jpg" alt="" 
                                                /></Link>
                                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Family</div>
                                            </div>
                                            <div className="p-4 pb-0">
                                                <h5 className="text-primary mb-3">$12,345</h5>
                                                <Link className="d-block h5 mb-2" to="/flat-details/">Sultan House For Rent</Link>
                                                <p><i className="fa fa-map-marker-alt text-primary me-2"></i>Piaratola</p>
                                            </div>
                                            <div className="d-flex border-top">
                                                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                        <div className="property-item rounded overflow-hidden">
                                            <div className="position-relative overflow-hidden">
                                                <Link to="/flat-details/"><img className="img-fluid fixed-img" src="/img/p2.jpg" alt="" 
                                                /></Link>
                                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Bachelor</div>
                                            </div>
                                            <div className="p-4 pb-0">
                                                <h5 className="text-primary mb-3">$12,345</h5>
                                                <Link className="d-block h5 mb-2" to="/flat-details/">Moriom House For Rent</Link>
                                                <p><i className="fa fa-map-marker-alt text-primary me-2"></i>Custom Mor</p>
                                            </div>
                                            <div className="d-flex border-top">
                                                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                        <div className="property-item rounded overflow-hidden">
                                            <div className="position-relative overflow-hidden">
                                                <Link to="/flat-details/"><img className="img-fluid fixed-img" src="/img/p3.jpg" alt="" 
                                                /></Link>
                                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Office</div>
                                            </div>
                                            <div className="p-4 pb-0">
                                                <h5 className="text-primary mb-3">$12,345</h5>
                                                <Link className="d-block h5 mb-2" to="/flat-details/">Khan Villa For Rent</Link>
                                                <p><i className="fa fa-map-marker-alt text-primary me-2"></i>Nissan Mor</p>
                                            </div>
                                            <div className="d-flex border-top">
                                                <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                                <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                                <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                    {/* Static Pagination */}
                                    <div className="col-12 mt-4 d-flex justify-content-center">
                                            <nav>
                                                <ul className="pagination">
                                                    <li className="page-item disabled">
                                                        <a className="page-link" href="#" tabindex="-1">Previous</a>
                                                    </li>
                                                    <li className="page-item active">
                                                        <a className="page-link" href="#">1</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">2</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">3</a>
                                                    </li>
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                        
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* <!-- Back to Top --> */}
                <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
                

        </div>

        
    );
};

export default FlatListPage;