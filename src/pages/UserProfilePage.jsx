import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import myaxios from "../uitils/myaxios";

const messages = ["Manage Your Profile!", "Keep Your Information Updated!"];

const UserProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await myaxios.get("/profile/");
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setProfile(response.data[0]);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile(); // Fetch profile when the component mounts
    }, []);

    // Handle form field changes
    const handleChange = ({ target: { name, value } }) => {
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profile?.id) return; // Prevent submission if profile ID is missing

        setIsSubmitting(true); // Set submitting state to true

        try {
            await myaxios.put(`/profile/${profile.id}/`, profile); // Update the profile via API
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsSubmitting(false); // Reset submitting state after the request
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="container-fluid header bg-white p-0" style={{ marginTop: "80px" }}>
                <div className="row g-0 align-items-center flex-column-reverse flex-md-row">
                    <div className="col-md-6 p-5 mt-lg-5">
                        <h1 className="display-5 animated fadeIn mb-4">User Profile</h1>
                        <nav aria-label="breadcrumb animated fadeIn">
                            <ol className="breadcrumb text-uppercase">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item text-body active" aria-current="page">
                                    Profile
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

            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="col-md-6 shadow p-5 rounded bg-white">
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {loading ? (
                        <div>Loading...</div> // Loading state
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="user_type"
                                    value={profile?.user_type || ""}
                                    onChange={handleChange}
                                    placeholder="User Type"
                                    readOnly
                                />
                                <label>User Type</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    value={profile?.first_name || ""}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                />
                                <label>First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    value={profile?.last_name || ""}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                />
                                <label>Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone_number"
                                    value={profile?.phone_number || ""}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                />
                                <label>Phone Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={profile?.email || ""}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    readOnly
                                />
                                <label>Email</label>
                            </div>

                            {/* Conditionally render house_holding_number and address fields */}
                            {profile?.user_type !== "renter" && (
                                <>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="house_holding_number"
                                            value={profile?.house_holding_number || ""}
                                            onChange={handleChange}
                                            placeholder="House Holding Number"
                                        />
                                        <label>House Holding Number</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={profile?.address || ""}
                                            onChange={handleChange}
                                            placeholder="Address"
                                        />
                                        <label>Address</label>
                                    </div>
                                </>
                            )}

                            <div className="text-center">
                                <button
                                    className="btn btn-primary w-100 py-2"
                                    type="submit"
                                    disabled={isSubmitting} // Disable button during submission
                                >
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
