import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LayOut = () => {
    return (
        <div>
            <div className="container-xxl bg-white p-0" style={{ paddingTop: "70px" }}>
                <Header />
                <Outlet /> {/* This renders the matched child routes */}
                <Footer />
            </div>
        </div>
    );
};

export default LayOut;