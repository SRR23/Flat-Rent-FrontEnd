
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlatListPage from './pages/FlatListPage';
import LayOut from './layout/LayOut';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import FlatDetailsPage from './pages/FlatDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddFlatPage from './pages/AddFlatPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>  {/* Ensure this component is added here */}
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/login/" element={<LoginPage />} />
          <Route path="/register/" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/flat-list/" element={<FlatListPage />} />
          <Route path="/flat-details/" element={<FlatDetailsPage />} />
          <Route path="/about/" element={<AboutPage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="/add-flat/" element={<AddFlatPage />} />
          <Route path="/user-profile/" element={<UserProfilePage />} />
        </Route>
      </Routes>
      </ScrollToTop>

    </BrowserRouter>
  );
}

export default App;
