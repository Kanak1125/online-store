import React from 'react'
import {BsHeart, BsHeartFill} from 'react-icons/bs';

const Card = (props) => {
    const {imgUrl, title, price} = props;

  return (
    <div className='card bg-white w-full rounded-lg p-6 mx-auto card-shadow transition-all duration-300 ease-in-out relative group overflow-hidden'>
      <div className='absolute right-5 bg-white p-2 rounded-full icon-shadow  translate-y-[-24%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all ease-out duration-300 text-red-500 '>
        <BsHeart size={24}/>
      </div>
      <div className='img-container w-full h-[260px] '>
          <img src={imgUrl} alt="" className='w-full h-full object-contain'/>
      </div>
      <div className="card-info pt-5 text-accent">
          <h3 className='italic text-xl font-semibold line-clamp-2'>{title}</h3>
          <p className='mt-4 text-lg font-bold'>$ <span>{price}</span></p>
      </div>
    </div>
  )
}

export default Card