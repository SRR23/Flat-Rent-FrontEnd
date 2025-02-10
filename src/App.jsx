
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlatListPage from './pages/FlatListPage';
import LayOut from './layout/LayOut';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import FlatDetailsPage from './pages/FlatDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>  {/* Ensure this component is added here */}
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/flat-list/" element={<FlatListPage />} />
          <Route path="/flat-details/" element={<FlatDetailsPage />} />
          <Route path="/about/" element={<AboutPage />} />
          <Route path="/contact/" element={<ContactPage />} />
        </Route>
      </Routes>
      </ScrollToTop>

    </BrowserRouter>
  );
}

export default App;
