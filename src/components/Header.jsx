import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import myaxios from "../uitils/myaxios"; // Adjust the import based on your project structure

const Header = () => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [category, setCategory] = useState(""); // ✅ Define category state
  const [selectedLocation, setSelectedLocation] = useState(""); // ✅ Define location state
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch categories and locations
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await myaxios.get("/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await myaxios.get("/locations/");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchCategories();
    fetchLocations();
  }, []);

  // Retrieve user from localStorage safely
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    navigate("/login/");
  };

  // Helper function to check active links
  const isActive = (path) => (location.pathname === path ? "active" : "");

  // 🔥 Fix: Use category & selectedLocation from state
  const handleSearch = () => {
    if (!category && !selectedLocation) return; // Ensure at least one filter is selected

    const queryParams = new URLSearchParams();
    if (category) queryParams.append("category", category);
    if (selectedLocation) queryParams.append("location", selectedLocation);

    navigate(`/search-flats/?${queryParams.toString()}`);
  };

  return (
    <div>
      <div className="container-xxl nav-bar bg-transparent">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4 fixed-top shadow-sm custom-navbar">
          <Link
            to="/"
            className={`navbar-brand d-flex align-items-center text-center ${isActive(
              "/"
            )}`}
          >
            <div className="icon p-2 me-2">
              <img
                className="img-fluid"
                src="/img/logo.jpeg"
                alt="Icon"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <Link to="/" className={`nav-item nav-link ${isActive("/")}`}>
                Home
              </Link>
              <Link
                to="/flat-list/"
                className={`nav-item nav-link ${isActive("/flat-list/")}`}
              >
                FlatList
              </Link>

              {/* Dynamic Category Dropdown */}
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                >
                  Category
                </a>
                <div className="dropdown-menu rounded-0 m-0">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category-flats/?category=${cat.id}`}
                        className="dropdown-item"
                      >
                        {cat.title}
                      </Link>
                    ))
                  ) : (
                    <span className="dropdown-item">
                      No categories available
                    </span>
                  )}
                </div>
              </div>

              <Link
                to="/about/"
                className={`nav-item nav-link ${isActive("/about/")}`}
              >
                About
              </Link>
              <Link
                to="/contact/"
                className={`nav-item nav-link ${isActive("/contact/")}`}
              >
                Contact
              </Link>
            </div>

            {/* Search Section */}
            <div className="d-flex align-items-center ms-3">
              {/* Category Select */}
              <select
                className="form-select me-2"
                style={{ cursor: "pointer" }}
                value={category}
                onChange={(e) => setCategory(e.target.value)} // ✅ Fix state update
              >
                <option value="">Select Flat Type</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>

              {/* Location Select */}
              <select
                className="form-select me-2"
                style={{ cursor: "pointer" }}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)} // ✅ Fix state update
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.title}>
                    {loc.title}
                  </option>
                ))}
              </select>

              {/* Search Button */}
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>

            {/* User Login / Dropdown */}
            <div className="ms-3">
              {user ? (
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                  >
                    {user?.user_type ?? "User"}
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to="/user-profile/" className="dropdown-item">
                      Profile
                    </Link>

                    {/* Renter-specific options */}
                    {user.user_type === "renter" && (
                      <>
                        <Link to="/renter-bookings/" className="dropdown-item">
                        Rent History
                        </Link>
                       
                      </>
                    )}

                    {/* Owner-specific options */}
                    {user.user_type === "owner" && (
                      <>
                        <Link to="/add-flat/" className="dropdown-item">
                          Add Properties
                        </Link>
                        <Link to="/owner-flats/" className="dropdown-item">
                          My Properties
                        </Link>
                       
                      </>
                    )}

                    {/* Logout Button */}
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login/" className={`btn btn-outline-primary ${isActive("/login/")}`}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
