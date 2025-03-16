import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import myaxios from "../uitils/myaxios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Add carousel styles
const HomePage = () => {
  const [flats, setFlats] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch flats
    myaxios
      .get("home/")
      .then((response) => {
        setFlats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching flats:", error);
        setError(error.message || "Something went wrong!");
        setLoading(false);
      });

    // Fetch categories
    myaxios
      .get("categories/") // Update with correct API endpoint
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div>
      <div
        className="container-fluid bg-white p-0"
        style={{ marginTop: "80px" }}
      >
        <div
          className="row g-0 align-items-center d-flex"
          style={{ minHeight: "600px" }}
        >
          {/* Left Side: Welcome Text */}
          <div className="col-md-6 d-flex align-items-center justify-content-center p-5">
            <div>
              <h1 className="display-4 fw-bold text-dark">
                Welcome to <span className="text-success">EasyRent</span>
              </h1>
              <p className="text-primary">
                EasyRent offers you the best rental flat at affordable prices.
              </p>
              <Link to="/flat-list/" className="btn btn-success btn-lg mt-3">
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Side: Carousel */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="w-100">
              <Carousel showThumbs={false} infiniteLoop autoPlay>
                <div>
                  <img
                    className="img-fluid w-100"
                    src="/img/Kustia.jpg"
                    alt="Slide 1"
                    style={{
                      height: "500px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div>
                  <img
                    className="img-fluid w-100"
                    src="/img/lodge.webp"
                    alt="Slide 2"
                    style={{
                      height: "500px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
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
            <h1 className="mb-3">Flat Types</h1>
            <p>
              Discover a variety of flat options to suit your needs, including
              apartments, villas, and office spaces. Whether you're looking for
              a cozy home or a spacious workspace, we have something for
              everyone.
            </p>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center gap-4 flex-wrap">
            {categories.map((category, index) => (
                <div key={index} className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`}>
                  <Link to={`/category-flats/?category=${category.id}`} className="cat-item d-block bg-light text-center rounded p-3">
                    <div className="rounded p-4">
                      <div className="icon mb-3">
                        <img className="img-fluid" src="img/icon-house.png" alt={category.title} />
                      </div>
                      <h6>{category.title}</h6>
                      {/* <span>{category.property_count} Properties</span> */}
                    </div>
                  </Link>
                </div>
              ))}
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
            <h1 className="mb-3">Flat List</h1>
            <p>
              Browse our curated list of flats, featuring modern apartments and
              comfortable living spaces. Find the perfect home that matches your
              lifestyle and budget.
            </p>
          </div>

          <div>
            <div className="tab-pane fade show p-0">
              {loading ? (
                <div className="row g-4">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                      <div className="property-item rounded overflow-hidden">
                        <div className="skeleton-image"></div>
                        <div className="p-4 pb-0">
                          <div className="skeleton-text"></div>
                          <div className="skeleton-text small"></div>
                        </div>
                        <div className="skeleton-footer"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <p className="text-center text-danger">Failed to load flats.</p>
              ) : (
                <div className="row g-4">
                  {flats.map((flat) => (
                    <div key={flat.id} className="col-lg-4 col-md-6">
                      <div className="property-item rounded overflow-hidden">
                        <div className="position-relative overflow-hidden">
                          <Link to={`/flat-details/${flat.slug}`}>
                            <img
                              className="img-fluid fixed-img"
                              src={`https://res.cloudinary.com/drgz0wgom/${flat.image_1}`}
                              alt="Flat"
                            />
                          </Link>
                          <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
                            For Rent
                          </div>
                          <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
                            {flat.category_title}
                          </div>
                        </div>
                        <div className="p-4 pb-0">
                          <h5 className="text-primary mb-3">${flat.price}</h5>
                          <Link
                            className="d-block h5 mb-2"
                            to={`/flat-details/${flat.slug}`}
                          >
                            {flat.title}
                          </Link>
                          <p>
                            <i className="fa fa-map-marker-alt text-primary me-2"></i>
                            {flat.location_title}
                          </p>
                        </div>
                        <div className="d-flex border-top">
                          <small className="flex-fill text-center border-end py-2">
                            <i className="fa fa-ruler-combined text-primary me-2"></i>
                            {flat.flat_size} Sqft
                          </small>
                          <small className="flex-fill text-center border-end py-2">
                            <i className="fa fa-bed text-primary me-2"></i>
                            {flat.room} Bed
                          </small>
                          <small className="flex-fill text-center py-2">
                            <i className="fa fa-bath text-primary me-2"></i>
                            {flat.bath} Bath
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div
                    className="col-12 text-center wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    <Link
                      className="btn btn-primary py-3 px-5"
                      to="/flat-list/"
                    >
                      Browse More Flat
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  );
};

export default HomePage;
