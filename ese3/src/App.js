import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../src/pages/HomePage'
import NotFoundPage from './pages/NotFoundPage';
import NavbarComponent from '../src/components/NavbarComponent'
import Blog from './pages/Blog'
import FooterComponent from './components/FooterComponent';
import SinglePost from './components/SinglePost';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
<>
<BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:postId' element={<SinglePost />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
</>
  );
}

export default App;
