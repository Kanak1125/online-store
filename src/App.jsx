import './App.css'
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Navbar from './components/Navbar';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [cartList, setCartList] = useState(true);
  const [isHamMenuActive, setIsHamMenuActive] = useState(false);
  const [toggleCategories, setToggleCategories] = useState(false);
  console.log(data);

  const categories = [...new Set(data.map(d => d.category))];
  console.log(categories);

    const {isLoading, error} = useQuery({
        queryKey: ["products"],
        queryFn: () => {
            axios.get(`https://fakestoreapi.com/products/`).then(res => setData(res.data));
            return data;
        },
        // staleTime: 1000 * 60 * 5    // the data will refetch only after 5 mins even if the page changes...
    })

  function handleSearch(e) {
    const value = e.target.value;
    setSearchTerm(value);
  }
  return (
    <BrowserRouter>
      <Navbar 
        isHamMenuActive={isHamMenuActive}
        setIsHamMenuActive={setIsHamMenuActive}
        toggleCategories={toggleCategories}
        setToggleCategories={setToggleCategories}
        categories={categories}
      />
      <Routes>
      <Route path="/" element={<Home
          data={data}
          isLoading={isLoading}
          error={error}
          setData={setData}
          categories={categories}
        />} />
        <Route path="/search" element={<Search 
          data={data}
          searchTerm={searchTerm}
        />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/products" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App