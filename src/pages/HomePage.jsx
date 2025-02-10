
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Add carousel styles
const HomePage = () => {
    return (
        <div>


            
            <div className="container-fluid header bg-white p-0">
                <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                    <div className="col-md-6 p-5 mt-lg-5">
                    <h1 className="display-5 animated fadeIn mb-4">
                        Find A <span className="text-primary">Perfect Flat</span> To Live With Your Family
                    </h1>
                    <p className="animated fadeIn mb-4 pb-2">
                        Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam no. Kasd rebum ipsum et
                        diam justo clita et kasd rebum sea elitr.
                    </p>
                    <Link to="/flat-list/" className="btn btn-primary py-3 px-5 me-3 animated fadeIn">
                        Get Started
                    </Link>
                    </div>
                    <div className="col-md-6 animated fadeIn">
                    <div className="header-carousel">
                        <Carousel>
                        <div>
                            <img className="img-fluid" src="/img/carousel-1.jpg" alt="Carousel 1" />
                        </div>
                        <div>
                            <img className="img-fluid" src="/img/carousel-2.jpg" alt="Carousel 2" />
                        </div>
                        {/* Add more slides as needed */}
                        </Carousel>
                    </div>
                    </div>
                </div>
            </div>

            
            <div className="container-xxl py-5">
                <div className="container">
                    <div
                    className="text-center mx-auto mb-5 wow fadeInUp"
                    data-wow-delay="0.1s"
                    style={{ maxWidth: "600px" }}
                    >
                    <h1 className="mb-3">Property Types</h1>
                    <p>
                        Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore
                        lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum
                        vero dolor duo.
                    </p>
                    </div>
                    <div className="row g-4">
                        
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <a className="cat-item d-block bg-light text-center rounded p-3" href="#">
                            <div className="rounded p-4">
                                <div className="icon mb-3">
                                <img className="img-fluid" src="img/icon-villa.png" alt="Villa" />
                                </div>
                                <h6>Family</h6>
                                <span>123 Properties</span>
                            </div>
                            </a>
                        </div>

                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <a className="cat-item d-block bg-light text-center rounded p-3" href="#">
                            <div className="rounded p-4">
                                <div className="icon mb-3">
                                <img className="img-fluid" src="img/icon-house.png" alt="Home" />
                                </div>
                                <h6>Bachelor</h6>
                                <span>123 Properties</span>
                            </div>
                            </a>
                        </div>

                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <a className="cat-item d-block bg-light text-center rounded p-3" href="#">
                            <div className="rounded p-4">
                                <div className="icon mb-3">
                                <img className="img-fluid" src="img/icon-housing.png" alt="Office" />
                                </div>
                                <h6>Office</h6>
                                <span>123 Properties</span>
                            </div>
                            </a>
                        </div>
                        
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <a className="cat-item d-block bg-light text-center rounded p-3" href="#">
                            <div className="rounded p-4">
                                <div className="icon mb-3">
                                <img className="img-fluid" src="img/icon-condominium.png" alt="Shop" />
                                </div>
                                <h6>Shop</h6>
                                <span>123 Properties</span>
                            </div>
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>


            <div className="container-xxl py-1">
                <div className="container">

                    <div
                    className="text-center mx-auto mb-5 wow fadeInUp"
                    data-wow-delay="0.1s"
                    style={{ maxWidth: "600px" }}
                    >
                    <h1 className="mb-3">Property List</h1>
                    <p>
                        Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore
                        lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum
                        vero dolor duo.
                    </p>
                    </div>

                    <div>
                        <div className="tab-pane fade show p-0">
                            <div className="row g-4">
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <Link to="/flat-details/"><img className="img-fluid" src="/img/property-1.jpg" alt="" /></Link>
                                            <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Appartment</div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <Link className="d-block h5 mb-2" to="/flat-details/">Golden Urban House For Sell</Link>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New York, USA</p>
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
                                            <Link to="/flat-details/"><img className="img-fluid" src="/img/property-2.jpg" alt="" /></Link>
                                            <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Villa</div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <Link className="d-block h5 mb-2" to="/flat-details/">Golden Urban House For Sell</Link>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New York, USA</p>
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
                                            <Link to="/flat-details/"><img className="img-fluid" src="/img/property-3.jpg" alt="" /></Link>
                                            <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Office</div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <Link className="d-block h5 mb-2" to="/flat-details/">Golden Urban House For Sell</Link>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="property-item rounded overflow-hidden">
                                        <div className="position-relative overflow-hidden">
                                            <Link to="/flat-details/"><img className="img-fluid" src="/img/property-4.jpg" alt="" /></Link>
                                            <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Building</div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <Link className="d-block h5 mb-2" to="/flat-details/">Golden Urban House For Sell</Link>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New York, USA</p>
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
                                            <Link to="/flat-details/"><img className="img-fluid" src="/img/property-5.jpg" alt="" /></Link>
                                            <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Sell</div>
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Home</div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <Link className="d-block h5 mb-2" to="/flat-details/">Golden Urban House For Sell</Link>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New York, USA</p>
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
                                            <Link to="/flat-details/"><img className="img-fluid" src="/img/property-6.jpg" alt="" /></Link>
                                            <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">For Rent</div>
                                            <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Shop</div>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <h5 className="text-primary mb-3">$12,345</h5>
                                            <Link className="d-block h5 mb-2" to="">Golden Urban House For Sell</Link>
                                            <p><i className="fa fa-map-marker-alt text-primary me-2"></i>123 Street, New York, USA</p>
                                        </div>
                                        <div className="d-flex border-top">
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-ruler-combined text-primary me-2"></i>1000 Sqft</small>
                                            <small className="flex-fill text-center border-end py-2"><i className="fa fa-bed text-primary me-2"></i>3 Bed</small>
                                            <small className="flex-fill text-center py-2"><i className="fa fa-bath text-primary me-2"></i>2 Bath</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <Link className="btn btn-primary py-3 px-5" to="/flat-list/">Browse More Flat</Link>
                                </div>
                    
                            </div>
                        </div>

                    </div>
                </div>
            </div>




            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
            
        </div>
    );
};

export default HomePage;