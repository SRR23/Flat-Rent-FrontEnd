import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
const messages = ["Find Your Dream Flat!", "Best Deals Available Now!"];

const AboutPage = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    
    // Reference to the first row
    const firstRowRef = useRef(null);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 4000); // Change message every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const handleSeeLess = () => {
        setShowMore(false);
        // Scroll to the first row
        firstRowRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>

            {/* Header Below Navbar */}
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
            
            {/* About Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    {/* Row 1 (Always Visible) */}
                    <div className="row g-5 align-items-center" ref={firstRowRef}>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                            <div className="about-img position-relative overflow-hidden p-5 pe-0">
                                <img className="img-fluid w-100" src="/img/about.jpg" alt="About" />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="mb-4">#1 Place To Find The Perfect Property</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <p><i className="fa fa-check text-primary me-3"></i>Tempor erat elitr rebum at clita</p>
                            <p><i className="fa fa-check text-primary me-3"></i>Aliqu diam amet diam et eos</p>
                            <p><i className="fa fa-check text-primary me-3"></i>Clita duo justo magna dolore erat amet</p>

                            {/* "See More" Button */}
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

                    {/* Additional Rows (Visible only when showMore is true) */}
                    {showMore && (
                        <>
                            {/* Row 2 */}
                            <div className="row g-5 align-items-center mt-4">
                                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div className="about-img position-relative overflow-hidden p-5 pe-0">
                                        <img className="img-fluid w-100" src="/img/property-2.jpg" alt="About" />
                                    </div>
                                </div>
                                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                    <h2 className="mb-4">Why Choose Us?</h2>
                                    <p className="mb-4">We provide top-notch properties with excellent amenities and customer support.</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Best price guarantee</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Wide range of properties</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Easy financing options</p>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="row g-5 align-items-center mt-4">
                                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                    <div className="about-img position-relative overflow-hidden p-5 pe-0">
                                        <img className="img-fluid w-100" src="/img/property-3.jpg" alt="About" />
                                    </div>
                                </div>
                                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                    <h2 className="mb-4">Customer Satisfaction</h2>
                                    <p className="mb-4">Our clients love our services and we continuously strive to improve.</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>24/7 Customer Support</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Thousands of happy customers</p>
                                    <p><i className="fa fa-check text-primary me-3"></i>Trusted by top real estate brands</p>

                                    {/* "See Less" Button (Only appears at the last row) */}
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
            {/* About End */}
        </div>
    );
};

export default AboutPage;
