import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const messages = ["Find Your Dream Flat!", "Best Deals Available Now!"];

const AboutPage = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const firstRowRef = useRef(null);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const handleSeeLess = () => {
        setShowMore(false);
        firstRowRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className="container-fluid header bg-white p-0" style={{ marginTop: "80px" }}>  
                <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                    <div className="col-md-6 p-5 mt-lg-5">
                        <h1 className="display-5 animated fadeIn mb-4">About Us</h1>
                        <nav aria-label="breadcrumb animated fadeIn">
                            <ol className="breadcrumb text-uppercase">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item text-body active" aria-current="page">About</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center position-relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={messageIndex}
                                className="position-absolute text-center text-primary fw-bold animated-message"
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
            
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-center" ref={firstRowRef}>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="about-img position-relative overflow-hidden p-5 pe-0">
                                <img className="img-fluid w-100" src="/img/about.jpg" alt="About" />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="mb-4">Your Premier Destination for Finding the Perfect Home</h1>
                            <p className="mb-4">We offer a seamless rental experience, connecting renters with verified property owners. Whether you're looking for a modern apartment, a luxury home, or a budget-friendly rental, we provide the best listings and exceptional service.</p>
                            <p><i className="fa fa-check text-primary me-3"></i>Verified property listings</p>
                            <p><i className="fa fa-check text-primary me-3"></i>Secure and hassle-free transactions</p>
                            <p><i className="fa fa-check text-primary me-3"></i>Competitive pricing with no hidden costs</p>

                            {!showMore && (
                                <button 
                                    className="btn btn-primary py-3 px-5 mt-3"
                                    onClick={() => setShowMore(true)}
                                >
                                    See More
                                </button>
                            )}
                        </div>
                    </div>

                    {showMore && (
                        <>
                            <div className="row g-5 align-items-center mt-4">
                                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div className="about-img position-relative overflow-hidden p-5 pe-0">
                                        <img className="img-fluid w-100" src="/img/property-2.jpg" alt="Why Choose Us" />
                                    </div>
                                </div>
                                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                    <h2 className="mb-4">Why Choose Us?</h2>
                                    <p className="mb-4">We prioritize convenience, affordability, and trust in every rental experience.</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Best price guarantee</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Wide range of properties for every budget</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Dedicated support team available 24/7</p>
                                </div>
                            </div>
                            <div className="row g-5 align-items-center mt-4">
                                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div className="about-img position-relative overflow-hidden p-5 pe-0">
                                        <img className="img-fluid w-100" src="/img/property-3.jpg" alt="Customer Satisfaction" />
                                    </div>
                                </div>
                                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                    <h2 className="mb-4">Committed to Customer Satisfaction</h2>
                                    <p className="mb-4">With thousands of happy clients, we continuously improve our platform to offer the best rental services.</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>98% Customer satisfaction rate</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Trusted by top real estate brands</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Personalized support for every user</p>
                                    <button 
                                        className="btn btn-danger py-3 px-5 mt-3"
                                        onClick={handleSeeLess}
                                    >
                                        See Less
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
