import React from 'react'
import { Link } from 'react-router-dom';
import {BsHeart, BsHeartFill} from 'react-icons/bs';
import { formatCurrency } from './formatCurrency';

const Card = (props) => {
  const {id, imgUrl, title, price} = props;

  return (
    <div className='card bg-white w-full rounded-lg p-6 mx-auto card-shadow transition-all duration-300 ease-in-out relative group overflow-hidden'>
      <div className='absolute right-5 bg-white p-2 rounded-full icon-shadow  translate-y-[-24%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all ease-out duration-300 text-red '>
        <BsHeart size={24}/>
      </div>
      <Link to={`/products/${id}`}>
        <div className='w-full h-[260px] '>
            <img src={imgUrl} alt="" className='w-full h-full object-contain'/>
        </div>
      </Link>
      <div className="card-info pt-5 text-accent">
          <Link to={`/products/${id}`}>
            <h3 className='italic text-xl font-semibold line-clamp-2'>{title}</h3>
          </Link>
          <p className='mt-4 text-lg font-bold'>{formatCurrency(price)}</p>
      </div>
    </div>
  )
}

export default Card