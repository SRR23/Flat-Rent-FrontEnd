import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import myaxios from "../uitils/myaxios";

const messages = ["Find Your Dream Flat!", "Best Deals Available Now!"];

const fetchFlatsByCategory = async (categoryId, page) => {
    const response = await myaxios.get(`/filter_category/?category=${categoryId}&page=${page}`);
    return response.data;
  };
  

const CategoryWiseFlatPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("category");
    
    const [messageIndex, setMessageIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
  
    const { data, error, isLoading } = useQuery({
      queryKey: ["category-flats", categoryId, currentPage],
      queryFn: () => fetchFlatsByCategory(categoryId, currentPage),
      keepPreviousData: true,
    });

    const categoryTitle = data?.results?.[0]?.category_title || "Category";  // Default if undefined


  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const flats = data?.results || [];
  const totalPages = data ? Math.ceil(data.count / data.page_size) : 1;

  // Pagination logic
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages).keys()].map((n) => n + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= totalPages - data.page_size) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  return (
    <div>
      <div
        className="container-fluid header bg-white p-0"
        style={{ marginTop: "80px" }}
      >
        <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
          <div className="col-md-6 p-5 mt-lg-5">
            <h1 className="display-5 animated fadeIn mb-4">Category Flat List</h1>
            <nav aria-label="breadcrumb animated fadeIn">
              <ol className="breadcrumb text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li
                  className="breadcrumb-item text-body active"
                  aria-current="page"
                >
                  {categoryTitle}
                </li>
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

      <div className="container-xxl py-1">
        <div className="container">
          {isLoading ? (
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
            </div>
          )}

          
          {/* Pagination */}
          <div className="col-12 mt-4 d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    Previous
                  </button>
                </li>
                {getPageNumbers().map((num) => (
                  <li
                    key={num}
                    className={`page-item ${
                      currentPage === num ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(num)}
                    >
                      {num}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage >= totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseFlatPage;