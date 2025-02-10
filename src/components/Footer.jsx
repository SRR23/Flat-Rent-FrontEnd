
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div>
            <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5 justify-content-center">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <h5 className="text-white mb-4">Get In Touch</h5>
                            <p className="mb-2">
                                <i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-phone-alt me-3"></i>+012 345 67890
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-envelope me-3"></i>info@example.com
                            </p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="btn btn-outline-light btn-social" href="#">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="btn btn-outline-light btn-social" href="#">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a className="btn btn-outline-light btn-social" href="#">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <h5 className="text-white mb-4">Terms & Conditions</h5>
                            <h3 className="btn btn-link text-white-50">
                                Submit NID
                            </h3>
                            <h3 className="btn btn-link text-white-50">
                                Advanced Booking
                            </h3>
                            <h3 className="btn btn-link text-white-50">
                                Pay Dinning Charge
                            </h3>
                            <h3 className="btn btn-link text-white-50">
                                Minimum 3 Months Stay
                            </h3>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <h5 className="text-white mb-4">Photo Gallery</h5>
                            <div className="row g-2 pt-2">
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src="/img/property-1.jpg" alt="Property 1" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src="/img/property-2.jpg" alt="Property 2" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src="/img/property-3.jpg" alt="Property 3" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src="/img/property-4.jpg" alt="Property 4" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src="/img/property-5.jpg" alt="Property 5" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src="/img/property-6.jpg" alt="Property 6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                    <div className="container">
                        <div className="copyright">
                            <div className="row">
                                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <Link className="border-bottom" to="/">EasyRent</Link>, All Right Reserved. Designed By{" "}
                                <a className="border-bottom" href="https://htmlcodex.com">
                                    HTML Codex
                                </a>
                                </div>
                                <div className="col-md-6 text-center text-md-end">
                                <div className="footer-menu">
                                    <Link to="/">Home</Link>
                                    <Link to="/about/">About</Link>
                                    <Link to="/contact/">Contact</Link>
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Footer;