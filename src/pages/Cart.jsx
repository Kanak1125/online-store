import {useEffect, useState} from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext';
import { BsTrash3 } from 'react-icons/bs';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const Cart = ({data}) => {
  const { cartItems, getItemQuantity, setItemQuantiy, increaseQuantity, decreaseQuantity, removeQuantity } = useShoppingCart();
  const [cartItemData, setCartItemData] = useState([])
  // const currentItem = data.find(d => {
  //   return cartItems.length === 0 ? [] : d.id === cartItems[0].id;
  // })
  // let currentItem;
  useEffect(() => {
    console.log("im being triggered...")
    setCartItemData(cartItems.filter(item => {
      return data.find(d => d.id === item.id)
    }))
  }, [cartItems, data]);
  // setCartItemData(currentItem => {
  //   // if ()
  // })
  // cartItems.map((item, index) => {
  //   // if (currentItem == null) return null;
  //   // return currentItem = data.find(d => (d.id === item.id
  //   // ))
  //   if (data.find(d => (item.id === d.id))) {
  //     return setCartItemData(currentItem => {
  //         return [
  //           ...currentItem,
  //           d
  //         ]
  //     })
  //   }
  // })
console.log(data);
  const shoppingCartList = cartItemData.map(item => {
    const {image, title, price} = item;

    return (
      <li key={index}>
        <div key={index} className="flex flex-col w-full bg-slate rounded-md md:h-[200px] md:flex-row md:items-center md:p-5 md:text-center mb-8 md:mb-0 shadow-lg md:shadow-none">
          <div className="w-full h-[200px] md:w-[160px] md:h-[160px] overflow-hidden bg-white py-4 md:basis-1/6 md:rounded">
            <img src={image} alt="" className='w-full h-full object-contain'/>
          </div>
          <p className='text-1xl font-semibold m-3 md:basis-4/12'>{title}</p>
          <div className="mt-3 px-3 flex items-center md:basis-3/12 md:mx-auto md:justify-center">
            <button 
              className="w-[32px] h-[32px] inline-flex rounded items-center justify-center border-2 border-accent font-bold hover:bg-accent hover:text-primary transition-all" 
              // onClick={() => decreaseQuantity(productData.id)}
            >-</button>
            <input 
                type="number" 
                name="" 
                id="quantity" 
                className='mx-2 rounded hide-scroll text-center border-2 border-accent outline-none h-[32px]'
                // value={getItemQuantity(productData.id)} 
                min={1} 
                max={5}
                // onChange={(e) => setItemQuantity(productData.id, e.target.value)}
                // onChange={(e) => handleQuantity(e)}
            />
            <button 
              className="w-[32px] h-[32px] inline-flex rounded items-center justify-center border-2 border-accent font-bold hover:bg-accent hover:text-primary transition-all" 
              // onClick={() => increaseQuantity(productData.id)}
            >+</button>
            <div className='bg-accent ml-10 md:order-last md:hidden p-2 rounded cursor-pointer'>
              <BsTrash3 size={18} className=' text-primary'/>
            </div>
          </div>
          <button className="m-3 mt-5 max-w-[120px] h-10 rounded button-shadow bg-accent text-primary md:basis-2/12">Buy now</button>
          <BsTrash3 size={24} className=' md:order-last hidden md:block md:basis-1/12 rounded cursor-pointer'/>
        </div>
        <hr className='border-2 border-primary'/>
      </li>
    )
  })

  console.log(cartItems, cartItemData);
  return (
    <main className='max-w-screen-xl mx-auto px-10 py-10 min-h-screen '>
      {
        cartItems.length === 0 ? <h2 className='text-2xl font-bold text-center text-secondary'>Your shopping Cart is empty </h2>
        :
        <>
          <h2 className='text-2xl font-bold'>Your shopping Cart </h2>
          <SimpleBar className='h-[444px]  my-10'>
            <ul className=''>
              {/* <li> */}
                {shoppingCartList}
                
              {/* </li> */}
            </ul>
          </SimpleBar>
        </>  
      }
    </main>
  )
}

export default Cart