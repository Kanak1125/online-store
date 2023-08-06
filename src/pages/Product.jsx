import React, { useState } from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
// import Breadcrumbs from '../components/Breadcrumbs';
import ProductSkeletonLoader from '../components/ProductSkeletonLoader';
import { useShoppingCart } from '../context/ShoppingCartContext';
import {BsStarFill, BsStarHalf} from 'react-icons/bs';
import { formatCurrency } from '../components/formatCurrency';

const Product = () => {
  const { productID } = useParams();
  const [productData, setProductData] = useState({});
  const {cartItems, getItemQuantity, setItemQuantity, increaseQuantity, decreaseQuantity} = useShoppingCart();

  const {isLoading, error, isFetching} = useQuery({
    queryKey: [`product-${productID}`],
    queryFn: async () => {
      const response = await axios.get(`https://fakestoreapi.com/products/${productID}`);
      setProductData(response.data);
      return response.data;
    }
  })

  console.log(cartItems);
  const [quantity, setQuantity] = useState(1);

  console.log(quantity);
  function incrementQuantity() {
      setQuantity(prevQuantity => prevQuantity + 1);
  }

  function decrementQuantity() {
      if (quantity === 1) return; 
      setQuantity(prevQuantity => prevQuantity - 1);
  }
  // function handleQuantity(e) {
  //     const value = e.target.value;
  //     const parsedValue = parseInt(value); // the value we get from the input field is string so parsing to INTEGER type...
  //     setQuantity(!isNaN(parsedValue) ? parsedValue : value);
  // }

  return (
    <main className='max-w-screen-xl mx-auto px-10 py-10 min-h-screen '>
      {/* <Breadcrumbs/> */}
      <h2 className='text-2xl font-bold'>Product Detail </h2>

      {
        isLoading || isFetching ? <ProductSkeletonLoader /> 
        :
        <div className="flex flex-col my-6 md:flex-row items-center gap-10">
          <div className="w-full h-[360px] md:basis-2/5 bg-white rounded py-8">
            <img src={productData.image} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="my-4 p-2 md:basis-3/5">
            <h2 className='text-2xl font-semibold'>{productData.title}</h2>
            <p className='my-5 font-bold'>{formatCurrency(productData.price)}</p>
            <div className="flex text-yellow my-3">
                <BsStarFill size={18}/>
                <BsStarFill size={18}/>
                <BsStarFill size={18}/>
                <BsStarFill size={18}/>
                <BsStarHalf size={18}/>
            </div>
            <p className='mb-5'>Availability: In stock</p>
            <p className="">{productData.description}</p>
            <div className="mt-10 flex items-center ">
                <label htmlFor="quantity" title='Quantity' className='mr-4'>Qty:</label>
                <button 
                  className="w-[32px] h-[32px] inline-flex rounded items-center justify-center border-2 border-accent font-bold hover:bg-accent hover:text-primary transition-all" 
                  onClick={() => decrementQuantity()}
                >-</button>
                <input 
                    type="number" 
                    name="" 
                    id="quantity" 
                    className='mx-2 rounded hide-scroll text-center border-2 border-accent outline-none h-[32px]'
                    value={quantity} 
                    min={0} 
                    max={5}
                    // onChange={(e) => setQuantity()}
                    // onChange={(e) => handleQuantity(e)}
                    readOnly
                />
                <button 
                  className="w-[32px] h-[32px] inline-flex rounded items-center justify-center border-2 border-accent font-bold hover:bg-accent hover:text-primary transition-all" 
                  onClick={() => incrementQuantity()}
                >+</button>
            </div>
            <div className='my-8'>
              <button 
                className="mr-6 mt-4 bg-accent w-[120px] h-10 rounded text-primary button-shadow "
                onClick={() => setItemQuantity(productID, quantity)}  
              >Add to cart</button>
              <button className="mr-6 mt-4 w-[120px] h-10 rounded button-shadow bg-primary text-accent border-2 border-accent hover:bg-accent hover:text-primary">Buy now</button>
            </div>
          </div>
        </div>
      }
    </main>
  )
}

export default Product