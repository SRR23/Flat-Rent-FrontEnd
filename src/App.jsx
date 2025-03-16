
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from './pages/HomePage';
import FlatListPage from './pages/FlatListPage';
import LayOut from './layout/LayOut';
import Guard from "./security/Guard";
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import FlatDetailsPage from './pages/FlatDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddFlatPage from './pages/AddFlatPage';
import UserProfilePage from './pages/UserProfilePage';
import OwnerFlatList from './pages/OwnerFlatList';
import CategoryWiseFlatPage from './pages/CategoryWiseFlatPage';
import SearchFlatPage from './pages/SearchFlatPage';
import RenterBookingList from './pages/RenterBookingList';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop>  {/* Ensure this component is added here */}
        <Routes>
          <Route element={<LayOut />}>
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/register/" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/flat-list/" element={<FlatListPage />} />
            <Route path="/category-flats/" element={<CategoryWiseFlatPage />} />
            <Route path="/search-flats/" element={<SearchFlatPage />} />
            <Route path="/flat-details/:slug/" element={<FlatDetailsPage />} />
            <Route path="/about/" element={<AboutPage />} />
            <Route path="/contact/" element={<ContactPage />} />
            <Route element={<Guard />}>
              <Route path="/add-flat/" element={<AddFlatPage />} />
              <Route path="/user-profile/" element={<UserProfilePage />} />
              <Route path="/owner-flats/" element={<OwnerFlatList />} />
              <Route path="/renter-bookings/" element={<RenterBookingList />} />
            </Route>
          </Route>
        </Routes>
        </ScrollToTop>

      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
